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
    public data:any;
    public params:any;
    public logo:any;
    public title:any;

    constructor(
        public events: Events,
        public menuController:MenuController
    ) {

      this.eventsHandles(this)
    }

  eventsHandles(root){
    root.events.unsubscribe('getPortsOverviewStatus_header')
    root.events.unsubscribe('getPortBandwidth_header')

    root.events.subscribe('getPortBandwidth_header',(d,p)=> {
     // console.log('getPortBandwidth_header',d,p);
      if(d){
         this.title = {ip:d.IP,port:d.Port}
      }
    })
  }

  toggleMenu = function(menuId){
    this.menuController.toggle(menuId)
  }

  openPage = function (pageName) {
    this.events.publish('activepage',{active:pageName})
    console.log(pageName)
  }
  openPort =function (port)
  {
    //this.params.port = port.port;
    this.events.publish('activepage',{active:'portInfo'},port)
  }


}
