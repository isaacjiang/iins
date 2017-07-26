/**
 * Created by isaacjiang on 2017-07-17.
 */
import {Component} from '@angular/core';
import {Http} from '@angular/http'
import {NavController, LoadingController, App,Events,MenuController} from 'ionic-angular';
import 'rxjs';



@Component({
  selector: 'iins-search',
  templateUrl: '../search/search.html'
})
export class SearchComponent {
  public params;
  public data;
  public authentication;
  public activePage;
  // public uploader:FileUploader = new FileUploader({url: '/rest/files/upload'});


  constructor(
              public nav: NavController,
              public menu:MenuController,
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
   // console.log('fileupload:',this.uploader)

  }

  ionViewWillEnter()
  {
    console.log(this.menu)
    // this.viewCtrl.showBackButton(false);
    this.app.setTitle('Intelligent Insurance')

  }

  ionViewDidEnter()
  {
  }
  ionViewWillLeave() {

  }


  doSomething(){
    console.log( this.menu)
  }

}
