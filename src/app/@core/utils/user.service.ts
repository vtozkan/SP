import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular'
import { HttpClient } from '@angular/common/http';
import { AuthError, InteractionRequiredAuthError } from 'msal';



@Injectable({
    providedIn:'root',
})
export class UserService {
    profile: any;

    constructor(private authService: MsalService, private http: HttpClient) { }

    getProfile(){
        let promise = new Promise((resolve, reject) => {
            this.http.get(GRAPH_ENDPOINT).toPromise()
            .then(
                res =>{
                    this.profile = res;
                    resolve(res);
                }
            )
            .catch((err: AuthError) => {
                // If there is an interaction required error,
                // call one of the interactive methods and then make the request again.
                if (InteractionRequiredAuthError.isInteractionRequiredError(err.errorCode)) {
                    this.authService.acquireTokenPopup({
                        scopes: this.authService.getScopesForEndpoint(GRAPH_ENDPOINT)
                    })
                        .then(() => {
                            this.http.get(GRAPH_ENDPOINT)
                                .toPromise()
                                .then(profile => {
                                    this.profile = profile;
                                });
                        });
                }
                reject();
            });
          });
          return promise;
    }


    //TODO: Get User photo from GRAPH API

    setUser(user:any){
        this.profile = user;
    }
}


export const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';







