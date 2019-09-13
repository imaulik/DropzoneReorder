import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {AppConstants} from "../../constants/app.constants";

@Component({
    selector: 'app-header',
    templateUrl: './app-header.component.html'
})
export class AppHeaderComponent
{
    user_profile;
    IMAGE_URL;
    constructor(private _router: Router)
    {
        this.IMAGE_URL = AppConstants.IMAGE_URL;
        let AuthUser = JSON.parse(localStorage.getItem('currentUser'));
        this.user_profile = AuthUser;
    }

    logout()
    {
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('permissions');
        localStorage.removeItem('role');
        this._router.navigate(['/login']);
    }

}
