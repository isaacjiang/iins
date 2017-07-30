/**
 * Created by isaacjiang on 2017-07-17.
 */
import {Component} from '@angular/core';
import {Http, URLSearchParams} from '@angular/http'
import {LoadingController, Events} from 'ionic-angular';
import 'rxjs';

@Component({
    selector: 'iins-menu',
    templateUrl: '../menu/menu.html'
})
export class MenuComponent {

    public mainMenuWorkflow = [];
    public authentication: any;
    public menuTitle:any;

    constructor(public http: Http,
                public loadingCtrl: LoadingController,
                public events: Events) {
        this.eventsHandles(this)
    }

    eventsHandles(root) {
        root.events.subscribe('authentication', (authentication) => {
            // console.log('getPortBandwidth_header',d,p);
            root.authentication = authentication
        })
        root.events.subscribe('toggleMainMenu', (param) => {
            this.getWorkflow(param)
            this.menuTitle = param.toUpperCase()
        })
    }

    getWorkflow(jobName) {
        let root = this
        let searchParams: URLSearchParams = new URLSearchParams();
        searchParams.set('jobName', jobName);
        searchParams.set('username', root.authentication['username']);

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
