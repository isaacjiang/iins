/**
 * Created by isaacjiang on 2017-07-03.
 */
import {Component} from '@angular/core';
import {Http} from '@angular/http'
import {NavController, LoadingController, App,Events} from 'ionic-angular';
import 'rxjs';
import {FileUploader } from 'ng2-file-upload';


@Component({
  templateUrl: '../base/base.html'
})
export class BasePage {
  public params;
  public data;
  public auth;
  public activePage;
  public uploader:FileUploader = new FileUploader({url: '/rest/files/upload'});


  constructor(
              public nav: NavController,
              public http:Http,
              public loadingCtrl: LoadingController,
              public events:Events,
              public app: App)
  {
    //data initialization

    this.data = {};
    this.params=
    {
      user:"admin",
      pwd:"providius1234!",
      ip:'192.168.1.120',
      port:'1',
      deviceType: "ARISTA",
      duration:0
    };
    this.activePage='devicesList'
    console.log('fileupload:',this.uploader)

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
      .subscribe((auth) => {
        root.auth = auth;
        // root.auth ={sid: "adc4e10e-3da2-4351-8f4d-2e9f4857cb97",username:'Providius',
        //   status:{is_authenticated:true,is_active:true,is_anonymous:false}
        // }
       console.log('auth',root.auth)

      })

  }



}
