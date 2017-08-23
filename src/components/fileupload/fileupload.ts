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
    public policyInfo = {};
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
            root.policyInfo['agent'] = {agent:textList[1],address:textList[2],phoneNumber:textList[3]}
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
        }
        console.log('policyInfo',root.policyInfo)
        root.policyComponent.policyInfo = root.policyInfo
    }



}
