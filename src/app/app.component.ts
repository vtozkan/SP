/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';

import { BroadcastService, MsalService } from '@azure/msal-angular';
import { AuthService } from './@core/utils/auth.service';
import { StateService } from './@core/utils';

@Component({
  selector: 'ngx-app',
  template: `
  <router-outlet *ngIf="!isIframe"></router-outlet>
  `
})
export class AppComponent implements OnInit {
  isIframe = false;
  loggedIn = false;

  constructor(private authService: AuthService, private broadcastService: BroadcastService) { }

   ngOnInit() {
     this.isIframe = window !== window.parent && !window.opener;

     this.authService.checkAccount();


    this.broadcastService.subscribe('msal:loginSuccess', () => {
      this.authService.checkAccount();
    });

    this.authService.handleRedirectCallback();

    this.authService.setLogger();
  }


}
