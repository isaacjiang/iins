/**
 * Created by isaacjiang on 2017-07-03.
 */
import {Component} from '@angular/core';
import {Http} from '@angular/http'
import {NavController, LoadingController, App,Events} from 'ionic-angular';
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

  constructor(
              public nav: NavController,
              public http:Http,
              public loadingCtrl: LoadingController,
              public events:Events,
              public app: App)
  {
    //data initialization


  }

  ionViewWillEnter()
  {
    // this.viewCtrl.showBackButton(false);
    this.app.setTitle('Intelligent Insurance')
    this.updateUserStatus()
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
       console.log('authentication',root.authentication)

      })

  }



}
