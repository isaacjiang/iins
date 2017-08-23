/**
 * Created by isaacjiang on 2017-07-17.
 */
import {Component} from '@angular/core';
import {Http} from '@angular/http'
import 'rxjs';



@Component({
  selector: 'iins-policy',
  templateUrl: '../policy/policy.html'
})
export class PolicyComponent {
  public information: string;
  public policyInfo:any;

  constructor(public http:Http)
  {
    this.information = "policy"
    this.policyInfo = {agent:{},policy:{},coverage:{},payment:{}}

  }


}
