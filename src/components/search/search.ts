/**
 * Created by isaacjiang on 2017-07-17.
 */
import {Component,Input} from '@angular/core';
import {Http} from '@angular/http'
import 'rxjs';



@Component({
  selector: 'iins-search',
  templateUrl: '../search/search.html'
})
export class SearchComponent {
  public searchText:any;
  public itemsList:any;
  @Input() search_id:any;

  constructor(
              public http:Http
             )
  {


  }


  getCustomers($event){

    console.log(this.searchText)
    let url ='/rest/customers/search?searchText=' +this.searchText
    this.http.get(url,this.application).map(response => response.json())
      .subscribe((resp) => {

        if (resp.length>0){
          console.log('itemsList:',resp)
          this.itemsList = resp
        }

      })
  }


  itemSelected(item){
    console.log('selected:',item)
    this.itemsList=[]
  }

}
