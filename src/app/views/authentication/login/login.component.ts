import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../services/index';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [AuthenticationService]
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    loginFormErrors: any;
    user: any = {};
    errors = '';
    constructor(private formBuilder: FormBuilder, private router: Router, private authenticationService: AuthenticationService) {
        if (localStorage.getItem('token')) {
            const AuthUser = localStorage.getItem('token');
            if (AuthUser) {
                this.router.navigate(['/']);
            } else {
                this.router.navigate(['/login']);
            }
        }
        this.loginFormErrors = {
            email: {},
            password: {}
        };

    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });

        this.loginForm.valueChanges.subscribe(() => {
            this.onLoginFormValuesChanged();
        });
    }


    onLoginFormValuesChanged() {
        for (const field in this.loginFormErrors) {
            if (!this.loginFormErrors.hasOwnProperty(field)) {
                continue;
            }

            // Clear previous errors
            this.loginFormErrors[field] = {};

            // Get the control
            const control = this.loginForm.get(field);

            if (control && control.dirty && !control.valid) {
                this.loginFormErrors[field] = control.errors;
            }
        }
    }

    aunthication() {
        this.authenticationService.login(this.user).subscribe(response => {
            const user = response;
            if (user.token && user.user) {
                localStorage.setItem('token', user.token);
                localStorage.setItem('currentUser', JSON.stringify(user.user));
                localStorage.setItem('permissions', JSON.stringify(user['user']['roles'][0]['permissions']));
                localStorage.setItem('role', JSON.stringify(user['user']['roles'][0]));
                this.router.navigate(['/dashboard']);
            }
        }, error => {
       
                this.errors = error.msg;
        });
    }

}
