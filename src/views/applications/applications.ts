/**
 * Created by isaacjiang on 2017-07-17.
 */
import {Component} from '@angular/core';
import {Http} from '@angular/http'
import {NavController, LoadingController,MenuController, App,Events} from 'ionic-angular';
import 'rxjs';
import {BaseService} from '../base/base'

import {FileUploader } from 'ng2-file-upload';


@Component({
  templateUrl: '../applications/applications.html',
    providers:[BaseService]
})
export class ApplicationsPage {

  // public policyList= [];
  public acitveView ='default';

  constructor(
              public nav: NavController,
              public http:Http,
              public loadingCtrl: LoadingController,
              public events:Events,
              public menuCtrl: MenuController,
              public baseService:BaseService,
              public app: App)
  {
   this.eventsHandles(this)
  }

    eventsHandles(root) {
        root.events.unsubscribe('menuClick')
        root.events.subscribe('menuClick', (param) => {
            console.log(param)
            this.menuCtrl.close()
            root.acitveView = param.taskKey
            // switch (param.taskKey){
            //     case "uploadpolicy":
            //       root.acitveView = param.taskKey
            // }

        })
    }

  ionViewWillEnter()
  {
      if(this.acitveView =='default'){
          this.get_policy_list()
      }

  }

  ionViewDidEnter()
  {
  }
  ionViewWillLeave() {

  }



  get_policy_list(){
      this.http.get('/rest/policy/getlist').map(response => response.json())
          .subscribe((resp) => {
              console.log('list data:',resp)
              // this.policyList = resp
              this.events.publish('policyList',resp)
          })
  }


}
