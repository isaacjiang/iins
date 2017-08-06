/**
 * Created by isaacjiang on 2017-07-17.
 */
import {Component,Input,DoCheck} from '@angular/core';
import {Http, URLSearchParams} from '@angular/http'
import {Events} from 'ionic-angular';
import 'rxjs';
import {FileUploader } from 'ng2-file-upload';

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

       setTimeout(()=>{
           console.log('components_id',this.components_id)
       },10)
    }

    // uploadSuccess(response){
    //    console.log(response)
    //
    // }

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
        let searchParams: URLSearchParams = new URLSearchParams();
        searchParams.set('file_id', file_id);
        this.http.get('/rest/files/download', {search: searchParams}) //.map(response => response.json())
            .subscribe((policy) => {
                //testing
                console.log(policy)

            })
    }






}
