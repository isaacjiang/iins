/**
 * Created by isaacjiang on 2017-07-17.
 */
import {Component} from '@angular/core';
import {Http} from '@angular/http'
import {NavController, LoadingController, App,Events} from 'ionic-angular';
import 'rxjs';
import {BaseService} from '../base/base'
import {FileUploader } from 'ng2-file-upload';


@Component({
  templateUrl: '../settings/settings.html',
    providers:[BaseService]
})
export class SettingsPage {

  public uploader:FileUploader = new FileUploader({url: '/rest/files/upload'});


  constructor(
              public nav: NavController,
              public http:Http,
              public loadingCtrl: LoadingController,
              public events:Events,
              public baseService:BaseService,
              public app: App)
  {
    //data initialization


  }

  ionViewWillEnter()
  {


  }

  ionViewDidEnter()
  {
  }
  ionViewWillLeave() {

  }




}
