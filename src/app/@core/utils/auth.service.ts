import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular'
import { Logger, CryptoUtils } from 'msal';



@Injectable({
    providedIn: 'root',
})
export class AuthService {
    loggedIn = false;

    constructor(private authService: MsalService) { }

    checkAccount() {
        this.loggedIn = !!this.authService.getAccount();
    }

    login() {
        const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

        if (isIE) {
            this.authService.loginRedirect();
        } else {
            this.authService.loginPopup();
        }
    }

    logout() {
        this.authService.logout();
    }

    handleRedirectCallback() {
        this.authService.handleRedirectCallback((authError, response) => {
            if (authError) {
                console.error('Redirect Error: ', authError.errorMessage);
                return;
            }
            console.log('Redirect Success: ', response.accessToken);
        });
    }

    setLogger() {
        this.authService.setLogger(new Logger((logLevel, message, piiEnabled) => {
            console.log('MSAL Logging: ', message);
        }, {
            correlationId: CryptoUtils.createNewGuid(),
            piiLoggingEnabled: false
        }));
    }


}