/**
 * Created by isaacjiang on 2017-07-03.
 */
import {Component,ViewChild} from '@angular/core';
import {Http,URLSearchParams} from '@angular/http'
import {NavController,App,Events,Tabs} from 'ionic-angular';
import 'rxjs';




@Component({
  templateUrl: 'base.html'
})
export class BasePage {

  public authentication = {};
  public attributes ={};

  constructor(
              public nav: NavController,
              public http:Http,
              public events:Events,
              public app: App)
  {
    this.updateUserStatus()
  }

  ionViewWillEnter()
  {
    // console.log(this.tabRef)
    this.app.setTitle('Intelligent Insurance')
  }

  ionViewDidEnter()
  {

  }
  ionViewWillLeave() {

  }

  updateUserStatus() {
    let root = this
    root.http.get('/rest/admin/userstatus').map(response => response.json())
      .subscribe((authentication) => {
      //testing
          authentication = {is_active:true, is_anonymous: false,is_authenticated: true,sid: "f600d1c4-c3f3-493b-ba85-fe80e5f27370",
              username:'Admin'}

        root.authentication = authentication;
          console.log('authentication',root.authentication)
        this.events.publish('authentication',authentication)
      })
  }



}
