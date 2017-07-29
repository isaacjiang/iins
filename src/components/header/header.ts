/**
 * Created by isaacjiang on 2016-09-01.
 */
import {Component, Input} from '@angular/core';

import {Events,MenuController} from "ionic-angular";
// import { CustomerPage } from '../customer/customer'
// import { InsurancePage } from '../insurance/insurance'
// import { ApplicationsPage } from '../applications/applications'
import { SearchComponent } from '../../components/search/search'
// import { SettingsPage } from '../settings/settings'


@Component({
    selector: 'iins-header',
    templateUrl: 'header.html'
})


export class HeaderComponent {
    public authentication:any;

    constructor(
        public events: Events,
        public menuController:MenuController
    ) {

      this.eventsHandles(this)
    }

  eventsHandles(root){

    root.events.subscribe('authentication',(authentication)=> {
     // console.log('getPortBandwidth_header',d,p);
     root.authentication= authentication
    })
  }

  toggleMenu = function(param){
    this.events.publish('toggleMainMenu',param)
    this.menuController.toggle('mainmenu')
  }





}
