/**
 * Created by isaacjiang on 2017-07-17.
 */
import {Component} from '@angular/core';
import {Http,URLSearchParams} from '@angular/http'
import { LoadingController,Events} from 'ionic-angular';
import 'rxjs';



@Component({
  selector: 'iins-menu',
  templateUrl: '../menu/menu.html'
})
export class MenuComponent {

  public mainMenuWorkflow=[]

  constructor(
              public http:Http,
              public loadingCtrl: LoadingController,
              public events:Events)
  {
    //data initialization
      this.getWorkflow('mainMenu')
  }


  getWorkflow(jobName) {
        let root = this
        let searchParams: URLSearchParams = new URLSearchParams();
        searchParams.set('jobName', jobName);
        root.http.get('/rest/workflow/getworkflowtemp',{search:searchParams}).map(response => response.json())
            .subscribe((workflow) => {
                root.mainMenuWorkflow=workflow;
                console.log('workflow',workflow)
            })
    }

}
