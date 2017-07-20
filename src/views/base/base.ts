/**
 * Created by isaacjiang on 2017-07-03.
 */
import {Component,ViewChild} from '@angular/core';
import {Http} from '@angular/http'
import {NavController,App,Events,Tabs} from 'ionic-angular';
import 'rxjs';

import { CustomerPage } from '../customer/customer'
import { InsurancePage } from '../insurance/insurance'
import { ApplicationsPage } from '../applications/applications'
import { SearchPage } from '../search/search'
import { SettingsPage } from '../settings/settings'


@Component({
  templateUrl: 'base.html'
})
export class BasePage {
  public tab1Root = SearchPage;
  public tab2Root = CustomerPage ;
  public tab3Root = InsurancePage;
  public tab4Root = ApplicationsPage;
  public tab5Root = SettingsPage;
  public authentication = {};
  public attributes ={};

  @ViewChild('navTabs') tabRef: Tabs;
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
    console.log(this.tabRef)
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
        root.authentication = authentication;
      // console.log('authentication',root.authentication)
      })
  }


}
