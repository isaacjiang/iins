/**
 * Created by isaacjiang on 2017-07-17.
 */
import {Component,Input} from '@angular/core';
import {Http, URLSearchParams} from '@angular/http'
import {Events} from 'ionic-angular';
import 'rxjs';
import {FileUploader } from 'ng2-file-upload';

@Component({
    selector: 'iins-fileupload',
    templateUrl: '../fileupload/fileupload.html'
})
export class FileuploadComponent {

    public uploader:FileUploader = new FileUploader({url: '/rest/files/upload'});
    @Input() components_id:any;

    constructor(public http: Http,
                public events: Events) {

       setTimeout(()=>{
           console.log('components_id',this.components_id)
            this.initialiaze()

       },10)
    }

    initialiaze()
    {

    }







}
