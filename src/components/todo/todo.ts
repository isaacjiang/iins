/**
 * Created by isaacjiang on 2017-07-17.
 */
import {Component,Input} from '@angular/core';
import {Http, URLSearchParams} from '@angular/http'
import {Events} from 'ionic-angular';
import 'rxjs';

import {BaseService} from '../../views/base/base'

@Component({
    selector: 'iins-todo',
    templateUrl: '../todo/todo.html',
    providers:[BaseService]
})
export class TodoComponent {

    public mainMenuWorkflow = [];
    public menuTitle:any;
    @Input() menu_id:any;

    constructor(public http: Http,
                public baseService:BaseService,
                public events: Events) {

       setTimeout(()=>{
           console.log('menuid',this.menu_id)
            this.initialiaze()

       },10)
    }

    initialiaze()
    {
         this.getWorkflow(this.menu_id)
    }


    getWorkflow(jobName) {
        let root = this
        let searchParams: URLSearchParams = new URLSearchParams();
        searchParams.set('jobName', jobName);
        searchParams.set('username', this.baseService.authentication['username']);

        root.http.get('/rest/workflow/getworkflowtemp', {search: searchParams}).map(response => response.json())
            .subscribe((workflow) => {
                root.mainMenuWorkflow = workflow;
                // console.log('workflow', workflow)
            })
    }

    menuClick(funcName){
        this.events.publish('menuClick',funcName)
    }



}
