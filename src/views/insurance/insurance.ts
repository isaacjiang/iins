/**
 * Created by isaacjiang on 2017-07-17.
 */
import {Component} from '@angular/core';
import {Http} from '@angular/http'
import {MenuController, LoadingController, App,Events} from 'ionic-angular';
import 'rxjs';

import {BaseService} from '../base/base'
import {FileUploader } from 'ng2-file-upload';

@Component({
  templateUrl: '../insurance/insurance.html',
  providers:[BaseService]
})
export class InsurancePage {

    public uploader:FileUploader = new FileUploader({url: '/rest/files/upload'});

    constructor(
        public http:Http,
        public events:Events,
        public menuCtrl:MenuController,
        public baseService:BaseService,
        public app: App)
    {
this.eventsHandles(this)
    }
    eventsHandles(root) {
        root.events.unsubscribe('toggleMenu')
        root.events.subscribe('toggleMenu', (param) => {
          console.log(param)
            this.menuCtrl.toggle('insurancemenu')
        })
    }
  ionViewWillEnter()
  {
    this.app.setTitle('Intelligent Insurance')
  }

  ionViewDidEnter()
  {
    console.log('insurance page')
    console.log(this.baseService.global)
  }
  ionViewWillLeave() {

  }
    openMenu(){
        this.menuCtrl.toggle('insurancemenu')
    }


}
