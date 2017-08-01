/**
 * Created by isaacjiang on 2016-09-01.
 */
import {Component} from '@angular/core';
import {Events,MenuController,NavController} from "ionic-angular";
import { CustomerPage } from '../../views/customer/customer'
import { InsurancePage } from '../../views/insurance/insurance'
import { ApplicationsPage } from '../../views/applications/applications'
import { SettingsPage } from '../../views/settings/settings'

import {BaseService} from '../../views/base/base'

@Component({
    selector: 'iins-header',
    templateUrl: 'header.html',
    providers:[BaseService]
})


export class HeaderComponent {
    public authentication:any;

    constructor(
        public events: Events,
        public menuCtrl:MenuController,
        public navCtrl:NavController
    ) {

      this.eventsHandles(this)
    }

  eventsHandles(root){

  }

  toggleMenu = function(param){
    this.events.publish('toggleMainMenu',param)


      switch (param) {
          case 'customer': {
              this.navCtrl.setRoot(CustomerPage);
              break;
          }

          case 'application': {
              this.navCtrl.setRoot(ApplicationsPage);
              break;
          }
          case 'settings': {
              this.navCtrl.setRoot(SettingsPage);
              break;
          }
          default: {
              this.navCtrl.setRoot(InsurancePage);
              this.menuCtrl.enable()
              this.menuCtrl.toggle()
              break;
          }
      }


      this.events.publish('toggleMenu',param)
  }





}
