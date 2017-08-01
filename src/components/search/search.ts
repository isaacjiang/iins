/**
 * Created by isaacjiang on 2017-07-17.
 */
import {Component} from '@angular/core';
import {Http} from '@angular/http'
import 'rxjs';



@Component({
  selector: 'iins-search',
  templateUrl: '../search/search.html'
})
export class SearchComponent {

  constructor(
              public http:Http
             )
  {


  }


}
