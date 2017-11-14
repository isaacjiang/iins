/**
 * Created by isaacjiang on 2016-09-01.
 */
import {Component} from '@angular/core';
import {Events, MenuController, NavController} from "ionic-angular";
import {CustomerPage} from '../../views/customer/customer'
import {InsurancePage} from '../../views/insurance/insurance'
import {ApplicationsPage} from '../../views/applications/applications'
import {StatisticsPage} from '../../views/statistics/statistics'
import {SettingsPage} from '../../views/settings/settings'


@Component({
    selector: 'iins-header',
    templateUrl: 'header.html'
})


export class HeaderComponent {
    public authentication: any;

    constructor(public events: Events,
                public menuCtrl: MenuController,
                public navCtrl: NavController) {

        this.eventsHandles(this)
    }

    eventsHandles(root) {

    }

    toggleMenu = function (param) {
        switch (param) {
            case 'customer': {
                this.navCtrl.setRoot(CustomerPage);
                break;
            }
            case 'statistics': {
                this.navCtrl.setRoot(StatisticsPage);
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
                break;
            }
        }

    }


}
