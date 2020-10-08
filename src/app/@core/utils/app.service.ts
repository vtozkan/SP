import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NbMenuItem } from '@nebular/theme';
import { Observable, of as observableOf } from 'rxjs';



@Injectable({
    providedIn: 'root',
})
export class AppService {
    menuItems: NbMenuItem[];

    constructor(private http: HttpClient) {

    }

    getMenuItems(): Observable<NbMenuItem[]> {
        //TODO: Get modules and menu items from app API
        this.menuItems = [
            {
                title: 'Dashboard',
                icon: 'home-outline',
                link: '/dashboard',
                home: true,
            },
            {
                title: 'Test',
                icon: 'home-outline',
                link: '/test-module',
            },
            {
                title: 'FEATURES',
                group: true,
            },
            {
                title: 'Auth',
                icon: 'lock-outline',
                children: [
                    {
                        title: 'Login',
                        link: '/auth/login',
                    },
                    {
                        title: 'Register',
                        link: '/auth/register',
                    },
                    {
                        title: 'Request Password',
                        link: '/auth/request-password',
                    },
                    {
                        title: 'Reset Password',
                        link: '/auth/reset-password',
                    },
                ]
            }
        ]
        return observableOf(this.menuItems);
    }
}









