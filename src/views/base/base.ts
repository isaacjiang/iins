/**
 * Created by isaacjiang on 2017-07-03.
 */
import {Injectable} from '@angular/core';
import {Http,URLSearchParams} from '@angular/http'
import {NavController,App,Events,Tabs} from 'ionic-angular';
import 'rxjs';


@Injectable()
export class BaseService {
  public authentication = {};
  public global ={server_ip:"localhost"};


  constructor(
              public nav: NavController,
              public http:Http,
              public events:Events,
              public app: App)
  {

  }


  updateUserStatus() {
    let root = this
    console.log('base authentication ...s')
    root.http.get('/rest/admin/userstatus').map(response => response.json())
      .subscribe((authentication) => {
      //testing
          authentication = {is_active:true, is_anonymous: false,is_authenticated: true,sid: "f600d1c4-c3f3-493b-ba85-fe80e5f27370",
              username:'Admin',permissions:['Administrator']}

        root.authentication = authentication;
        this.events.publish('authentication',authentication)
      })
  }




}
