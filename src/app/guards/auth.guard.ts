import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { tokenNotExpired } from 'angular2-jwt';


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private _router: Router, private _location: Location) {
    }

    isLoggedIn() {
        return tokenNotExpired();
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        //    console.log(route.children[0].data.data.permission);
        // console.log(route.children[0]);
        const permission = route.children[0].data.permission;
        if (tokenNotExpired()) {
            let flag = 0;
            const AuthUserPermission = JSON.parse(localStorage.getItem('permissions'));
            for (let i = 0; i < AuthUserPermission.length; i++) {
                for (let j = 0; j < permission.length; j++) {
                    if (AuthUserPermission[i].name === permission[j]) {
                        flag = 1;
                    }
                }
            }
            if (flag === 1) {
                // console.log(flag);
                return true;
            } else {
                this._location.back();
                return false;
            }
        } else {

            this._router.navigate(['/login']);
            return false;

        }
    }


}
