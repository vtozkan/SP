import { Component, OnInit } from '@angular/core';

import { AppService } from '../@core/utils/app.service';
import { NbMenuItem } from '@nebular/theme';
import { StateService } from '../@core/utils';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet id="content" class="content"></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit{
  menu;
  constructor(private appService: AppService, private stateService:StateService){}

  ngOnInit(): void {
    this.appService.getMenuItems()
    .subscribe((menu: NbMenuItem[])=>{
        this.menu = menu;
    });



    this.load('test-module');
  }




  config = {
    "test-module": {
      loaded: false,
      path: 'test-module/main.js',
      element: 'test-module'
    },
    
  };



  load(name: string): void {

    const configItem = this.config[name];
    if (configItem.loaded) return;

    const content = document.getElementById('content');

    const script = document.createElement('script');
    script.src = configItem.path;
    script.type= "text/javascript";
    content.appendChild(script);
    
    const element: HTMLElement = document.createElement(configItem.element);
    console.log(element, 'registered : ', this.stateService.checkClientRegistration(element));
    if(!this.stateService.checkClientRegistration(element)){
      content.appendChild(element);
      console.log("Element Appended");
      element.addEventListener('message', msg => this.handleMessage(msg));
      element.setAttribute('state', 'init');
      console.log("Event Appended");
      script.onerror = () => console.error(`error loading ${configItem.path}`);
  
  
      this.stateService.registerClient(element);
      console.log("Client Registered");
    }
    

  }

  handleMessage(msg): void {
    console.debug('shell received message: ', msg.detail);
  }


}
