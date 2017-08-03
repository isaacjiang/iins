/**
 * Created by isaacjiang on 2017-07-17.
 */
import {Component,Input} from '@angular/core';
import {Http, URLSearchParams} from '@angular/http'
import {Events} from 'ionic-angular';
import 'rxjs';

import {BaseService} from '../../views/base/base'

@Component({
    selector: 'iins-table',
    templateUrl: '../table/table.html',
    providers:[BaseService]
})
export class TableComponent {

    public formData = [];
    public originalData =[];
    public formTitle:any;
    @Input() form_id:any;

    constructor(public http: Http,
                public baseService:BaseService,
                public events: Events) {

       setTimeout(()=>{
           console.log('form_id',this.form_id)
            this.initialiaze()
            this.fillingData(this.originalData)
           console.log(this.formData)
       },10)
    }

    initialiaze()
    {
        this.originalData =[
            {id:10000021,customerName:'Michael Lin',policyNo:"3502301201303",expireDate:'2017-06-09',notified:"Yes"},
            {id:10000022,customerName:'DDDDD Ln',policyNo:"3502301201303",expireDate:'2017-06-09',notified:"Yes"},
            {id:10000023,customerName:'QUR Lin',policyNo:"3502301201303",expireDate:'2017-06-09',notified:"No"},
            {id:10000041,customerName:'HA Lin',policyNo:"3502301201303",expireDate:'2017-06-09',notified:"Yes"},
            {id:10000066,customerName:'MIN Lin',policyNo:"3502301201303",expireDate:'2017-06-09',notified:"Yes"},
            {id:10000025,customerName:'Micha2l Lin',policyNo:"3502301201303",expireDate:'2017-06-10',notified:"Yes"},
            {id:10000028,customerName:'Michae4 Lin',policyNo:"3502301201304",expireDate:'2017-06-19',notified:"No"},
            {id:10000029,customerName:'Michae6 Lin',policyNo:"3502301201306",expireDate:'2017-06-29',notified:"Yes"}
            ]
    }

    fillingData(originalData) {
        this.formData = [];

        let titleList = [];

        if (originalData && Object.keys(originalData).length > 0) {

            titleList = ['id','customerName','policyNo','expireDate','notified']
            this.formData[0] = ['ID', 'Name', 'Policy No','Expire Date','Notification'];

           for(let line of this.originalData){
               let valueList = []
               for (let key of titleList){
                   valueList.push(line[key])
               }
               this.formData.push(valueList)

           }

        }
    }
    selectLine(event){

    }

    selectCell(row,col){

    }

    getWorkflow(jobName) {
        let root = this
        let searchParams: URLSearchParams = new URLSearchParams();
        searchParams.set('jobName', jobName);
        searchParams.set('username', this.baseService.authentication['username']);

        root.http.get('/rest/workflow/getworkflowtemp', {search: searchParams}).map(response => response.json())
            .subscribe((workflow) => {

                // console.log('workflow', workflow)
            })
    }




}
