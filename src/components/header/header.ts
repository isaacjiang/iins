/**
 * Created by isaacjiang on 2016-09-01.
 */
import {Component, Input} from '@angular/core';

import {Events,MenuController} from "ionic-angular";



@Component({
    selector: 'nvrt-header',
    templateUrl: 'header.html'
})


export class Header {
    public data:any;
    public params:any;
    public logo:any;
    public title:any;

    constructor(
        public events: Events,
        public menuController:MenuController
    ) {

      this.eventsHandles(this)
    }

  eventsHandles(root){
    root.events.unsubscribe('getPortsOverviewStatus_header')
    root.events.unsubscribe('getPortBandwidth_header')
    root.events.subscribe('getPortsOverviewStatus_header', (d,p) => {
      // console.log(d,p)
      if(d.Data){
        var dataset =[]
        for(let port of  Object.keys(d.Data)){
          var pt =d.Data[port];
          pt['port'] = port;
          pt['portAlias']='P'+port.replace('Ethernet','').replace("Eth", "");
          dataset.push(pt)
        }
        dataset.sort(function (a, b) {
          return parseInt((a.port).toString().replace("Ethernet", "").replace("Eth1/", "")) - parseInt((b.port).toString().replace("Ethernet", "").replace("Eth1/", ""))
        });

        root.data=dataset
        root.params=p

        if (p.deviceType.toUpperCase()=='IPX'){
          root.logo = "assets/icon/logo-evertz.png"
        }
        else if (p.deviceType.toUpperCase()=='ARISTA'){
          root.logo = "assets/icon/logo-arista.png"
        }
        else if (p.deviceType.toUpperCase()=='MELLANOX'){
          root.logo = "assets/icon/logo-mellanox.png"
        }
        else if (p.deviceType.toUpperCase()=='CISCO'){
          root.logo = "assets/icon/logo-cisco.png"
        }
        else if (p.deviceType.toUpperCase()=='JUNIPER'){
          root.logo = "assets/icon/logo-juniper.png"
        }
        else if (p.deviceType.toUpperCase()=='HUAWEI'){
          root.logo = "assets/icon/logo-huawei.png"
        }
        else {
          root.logo = "assets/icon/logo-evertz.png"
        }

      }

    });
    root.events.subscribe('getPortBandwidth_header',(d,p)=> {
     // console.log('getPortBandwidth_header',d,p);
      if(d){
         this.title = {ip:d.IP,port:d.Port}
      }
    })
  }

  toggleMenu = function(menuId){
    this.menuController.toggle(menuId)
  }

  openPage = function (pageName) {
    this.events.publish('activepage',{active:pageName})
  }
  openPort =function (port)
  {
    //this.params.port = port.port;
    this.events.publish('activepage',{active:'portInfo'},port)
  }


}
