/**
 * Created by isaacjiang on 2017-07-17.
 */
import {Component,Input,DoCheck} from '@angular/core';
import {Http} from '@angular/http'
import {Events} from 'ionic-angular';
import 'rxjs';
import {FileUploader } from 'ng2-file-upload';
import * as pdfjs from 'pdfjs-dist'


@Component({
    selector: 'iins-fileupload',
    templateUrl: '../fileupload/fileupload.html'
})
export class FileuploadComponent implements DoCheck{

    public switches={show_policy:false,file_upload_lable:'Please choose a policy file.'}

    public uploader:FileUploader = new FileUploader({url: '/rest/files/upload'});
    @Input() components_id:any;

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
                this.download_policy(file_id)
                this.switches.show_policy=true
                this.switches.file_upload_lable ='Uploaded file: '+ this.switches.file_upload_lable
                this.uploader.queue.pop()
            }
        }
}


    download_policy(file_id) {

        let url = "/rest/files/download?file_id="+file_id
        pdfjs.getDocument(url).promise.then(function(pdf) {
            console.log('PDF loaded',);
            // Fetch the first page
            var pageNumber = 1;
            pdf.getPage(pageNumber).then(function(page) {
                console.log('Page loaded');
                var textContent = page.getTextContent();
                textContent.then(function(text){ // return content promise
                     console.log('text',text.items.map(function (s) { return s.str; }))
                    // return text.items.map(function (s) { return s.str; }).join(''); // value page text

                });

                var scale = 1;
                var viewport = page.getViewport(scale);
                console.log(viewport)

                // Prepare canvas using PDF page dimensions
                var canvas:any = document.getElementById('file-canvas');
                var context:any = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                // Render PDF page into canvas context
                var renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };
                var renderTask = page.render(renderContext);
                renderTask.then(function () {
                    console.log('Page rendered');
                });
            });
        }, function (reason) {
            // PDF loading error
            console.error(reason);
        });


    }






}
