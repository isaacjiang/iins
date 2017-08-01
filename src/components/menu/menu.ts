/**
 * Created by isaacjiang on 2017-07-17.
 */
import {Component} from '@angular/core';
import {Http, URLSearchParams} from '@angular/http'
import {LoadingController, Events} from 'ionic-angular';
import 'rxjs';

import {BaseService} from '../../views/base/base'

@Component({
    selector: 'iins-menu',
    templateUrl: '../menu/menu.html',
    providers:[BaseService]
})
export class MenuComponent {

    public mainMenuWorkflow = [];
    public menuTitle:any;

    constructor(public http: Http,
                public loadingCtrl: LoadingController,
                public baseService:BaseService,
                public events: Events) {
        this.eventsHandles(this)
    }

    eventsHandles(root) {
        root.events.unsubscribe('toggleMainMenu')
        root.events.subscribe('toggleMainMenu', (param) => {
            this.getWorkflow(param)
            this.menuTitle = param.toUpperCase()
        })
    }

    getWorkflow(jobName) {
        let root = this
        let searchParams: URLSearchParams = new URLSearchParams();
        searchParams.set('jobName', jobName);
        searchParams.set('username', this.baseService.authentication['username']);

        root.http.get('/rest/workflow/getworkflowtemp', {search: searchParams}).map(response => response.json())
            .subscribe((workflow) => {
                root.mainMenuWorkflow = workflow;
                console.log('workflow', workflow)


            })
    }

    changeView(funcName){
        console.log('click',funcName)
    }


}
