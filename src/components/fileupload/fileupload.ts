/**
 * Created by isaacjiang on 2017-07-17.
 */
import {Component,Input,DoCheck,ViewChild} from '@angular/core';
import {Http} from '@angular/http'
import {Events} from 'ionic-angular';
import 'rxjs';
import {FileUploader } from 'ng2-file-upload';
import * as pdfjs from 'pdfjs-dist'
import {PolicyComponent} from '../../components/policy/policy'


@Component({
    selector: 'iins-fileupload',
    templateUrl: '../fileupload/fileupload.html'
})
export class FileuploadComponent implements DoCheck{

    public switches={show_policy:false,file_upload_lable:'Please choose a policy file.'};
    public policyInfo =  {agent:{},policy:{},coverage:{},payment:{}};
    public uploader:FileUploader = new FileUploader({url: '/rest/files/upload'});
    @Input() components_id:any;
    @ViewChild(PolicyComponent) policyComponent:PolicyComponent;

    constructor(public http: Http,
                public events: Events) {
      pdfjs.PDFJS.workerSrc = '/assets/lib/pdf.worker.js';

       setTimeout(()=>{
           console.log('components_id',this.components_id)
       },10)
    }


    ngDoCheck(){
        if (this.uploader.queue.length>0){
            this.switches.file_upload_lable = this.uploader.queue[0].file.name
            // this.uploader.queue[0].onSuccess = this.uploadSuccess
            if( this.uploader.queue[0].isSuccess){
                let  file_id= JSON.parse(this.uploader.queue[0]._xhr.response)[0].file_id
                this.download_policy(file_id,this)
                this.switches.show_policy=true
                this.switches.file_upload_lable ='Uploaded file: '+ this.switches.file_upload_lable
                this.uploader.queue.pop()
            }
        }
}


    download_policy(file_id,root) {

        let url = "/rest/files/download?file_id="+file_id
        pdfjs.getDocument(url).promise.then(function(pdf) {

        // Fetch the first page
        var pageNumber = 1;
        pdf.getPage(pageNumber).then(function(page) {

            page.getTextContent().then(function(text){ // return content promise
                 console.log('text',text.items.map(function (s) { return s.str; }))
                let textList = text.items.map(function (s) { return s.str; })
                root.read_pdf(textList,root)

            });

            let scale = 1;
            let viewport = page.getViewport(scale);

            // Prepare canvas using PDF page dimensions
            let canvas:any = document.getElementById('file-canvas');
            let context:any = canvas.getContext('2d');

            canvas.height = viewport.height;
            canvas.width = viewport.width;


            // Render PDF page into canvas context
            let renderContext = {
                canvasContext: context,
                viewport: viewport
            };
            let renderTask = page.render(renderContext);
            renderTask.then(function () {
                console.log('Page rendered');
            });
        });
        }, function (reason) {
            // PDF loading error
            console.error(reason);
        });


    }


    read_pdf(textList,root){
        if (textList[0]=="JF Agent - "){
            root.policyInfo['insurer'] = 'JF'
            root.policyInfo['agent'] = {agent:textList[1],address:textList[2],postcode:textList[2],phoneNumber:textList[3]}
            root.policyInfo['policy']={
                policyHolder:textList[7],
                dateOfBirth: textList[9],
                address:textList[11],
                postcode:textList[12],
                phoneNumber:textList[14],
                email:textList[16],
                policyNumber: textList[19],
                applicationDate: textList[21],
                effectiveDate:textList[23],
                expiryDate:textList[25],
                numberOfDays:textList[27]
            }
            root.policyInfo['coverage']={
                planType: textList[33],
                planAndBenefits:[
                    {insurancePlan:textList[31],
                        sumInsured:textList[35],
                        premium: textList[44],
                        deductible:textList[37]
                    }
                ],
                totalPremium:textList[42],
                taxes:0,
                total:textList[42],
                beneficiary:textList[39],
                relationship:null
            }
            root.policyInfo['payment']={
                paymentAmount:textList[42],
                paymentDate:textList[46],
                paymentMethod:textList[48]
            }
        }
        else if (textList[textList.length-1].indexOf('Allianz')>=0){
            root.policyInfo['insurer'] = 'Allianz'
            root.policyInfo['agent'] = {agent:textList[11],code:textList[14],address:textList[15]+textList[16],postcode:textList[17],phoneNumber:textList[18]}
            root.policyInfo['policy']={
                policyHolder:textList[24],
                dateOfBirth: textList[25],
                address:textList[6]+textList[7],
                postcode:textList[8],
                phoneNumber:textList[9].split(':  ')[1],
                email:textList[10].split(':  ')[1],
                policyNumber: textList[19].split(':  ')[1],
                applicationDate: textList[32],
                departureDate:textList[34],
                effectiveDate:textList[36],
                expiryDate:textList[38],
                numberOfDays:textList[40],
                tripDuration:textList[42]
            }
            root.policyInfo['coverage']={
                planType: textList[46],
                planAndBenefits:[
                    {insurancePlan:textList[50],
                    sumInsured:textList[51],
                    premium:textList[52],
                    deductible:textList[53].split(':  ')[1]
                    },
                    {insurancePlan:textList[54],
                        sumInsured:textList[55],
                        premium:textList[56],
                        deductible:null,
                    }
                    ],
                totalPremium:textList[60],
                taxes:textList[62],
                total:textList[64],
                beneficiary:textList[26].split(':  ')[1],
                relationship:textList[28].split(':  ')[1]
            }
            root.policyInfo['payment']={
                paymentAmount:textList[71],
                paymentDate:textList[81],
                paymentMethod:textList[67]
            }
        }
        console.log('policyInfo',root.policyInfo)
        root.policyComponent.policyInfo = root.policyInfo
    }



}
