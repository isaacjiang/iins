/**
 * Created by isaacjiang on 2017-07-17.
 */
import {Component,Input} from '@angular/core';
import {Http, URLSearchParams} from '@angular/http'
import {Events} from 'ionic-angular';
import 'rxjs';

@Component({
    selector: 'iins-application',
    templateUrl: '../application/application.html'

})
export class ApplicationComponent {

    public title:any;
    public application:any
    @Input() form_id:any;

    constructor(public http: Http,
                // public baseService:BaseService,
                public events: Events) {
       this.eventsHandles(this)
        this.title = 'Application'
        this.application={type:'travel'}
       // setTimeout(()=>{
       //     console.log('form_id',this.form_id)
       //      this.initialiaze()
       //      this.fillingData(this.originalData)
       //     console.log(this.formData)
       // },10)
    }

    eventsHandles(root) {
        root.events.unsubscribe('policyList')
        root.events.subscribe('policyList', (originalData) => {
            console.log(originalData)


        })
    }







}
