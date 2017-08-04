/**
 * Created by isaacjiang on 2017-07-17.
 */
import {Component} from '@angular/core';
import {Http} from '@angular/http'
import {MenuController, LoadingController, App, Events} from 'ionic-angular';
import 'rxjs';

import {BaseService} from '../base/base'
import {FileUploader} from 'ng2-file-upload';

@Component({
    templateUrl: '../statistics/statistics.html',
    providers: [BaseService]
})
export class StatisticsPage {

    public uploader: FileUploader = new FileUploader({url: '/rest/files/upload'});
    public workoutProgress: any;
    constructor(public http: Http,
                public events: Events,
                public menuCtrl: MenuController,
                public baseService: BaseService,
                public app: App)
    {
        this.eventsHandles(this)
    }

    eventsHandles(root) {
        // root.events.unsubscribe('menuClick')
        root.events.subscribe('menuClick', (param) => {
            console.log(param)
            this.menuCtrl.close()
        })
    }

    ionViewWillEnter() {
        this.app.setTitle('Intelligent Insurance')
    }

    ionViewDidEnter() {
        console.log(this.baseService.global)
        this.updateProgress(0.3)
    }

    ionViewWillLeave() {

    }

    updateProgress(val) {
        // Update percentage value where the above is a decimal
        this.workoutProgress = Math.min( (val * 5), 5);
    }

    openMenu() {
        this.menuCtrl.toggle()
    }


}
