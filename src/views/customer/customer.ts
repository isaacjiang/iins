/**
 * Created by isaacjiang on 2017-07-17.
 */
import {Component} from '@angular/core';
import {Http} from '@angular/http'
import {NavController, LoadingController, App,Events} from 'ionic-angular';
import 'rxjs';
import {FileUploader } from 'ng2-file-upload';


@Component({
  templateUrl: '../customer/customer.html'
})
export class CustomerPage {
  public params;
  public data;
  public auth;
  public activePage;
  public uploader:FileUploader = new FileUploader({url: '/rest/files/upload'});
  public authentication;

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
    //console.log('fileupload:',this.uploader)

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
        // console.log('authentication',root.authentication)
      })
  }



}
