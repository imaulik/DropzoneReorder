import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService, LoaderService } from '../../../services/index';

@Component({
    templateUrl: 'forget.component.html',
    providers: [AuthenticationService]
})
export class ForgetComponent implements OnInit {

    forgetForm: FormGroup;
    forgetFormErrors: any;
    user: any = {};
    errors = '';
    constructor(
        private formBuilder: FormBuilder,
        private loaderService: LoaderService,
        public authenticationService: AuthenticationService,
        private http: HttpClient, private router: Router
    ) {

        if (localStorage.getItem('token')) {
            const AuthUser = localStorage.getItem('token');
            if (AuthUser) {
                this.router.navigate(['/']);
            } else {
                this.router.navigate(['/login']);
            }
        }
        this.forgetFormErrors = {
            email: {}
        };

    }

    ngOnInit() {
        this.forgetForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        });

        this.forgetForm.valueChanges.subscribe(() => {
            this.onFormValuesChanged();
        });
    }

    onFormValuesChanged() {
        for (const field in this.forgetFormErrors) {
            if (!this.forgetFormErrors.hasOwnProperty(field)) {
                continue;
            }

            // Clear previous errors
            this.forgetFormErrors[field] = {};

            // Get the control
            const control = this.forgetForm.get(field);

            if (control && control.dirty && !control.valid) {
                this.forgetFormErrors[field] = control.errors;
            }
        }
    }

    SaveForget() {
        this.loaderService.display(true);
        this.authenticationService.forget_password(this.user).subscribe(response => {
            this.loaderService.display(false);
            this.router.navigate(['/login']);
        },
            error => {
                this.loaderService.display(false);
                this.errors = error.error.error.email[0];
            });

    }
}
