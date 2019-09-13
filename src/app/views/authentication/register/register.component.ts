import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService, RoleService } from '../../../services/index';

@Component({
    templateUrl: 'register.component.html',
    styleUrls: ['./register.component.scss'],
    providers: [AuthenticationService, RoleService]
})
export class RegisterComponent implements OnInit {

    registerForm: FormGroup;
    registerFormErrors: any;
    user: any = {};
    errors = '';

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        public authenticationService: AuthenticationService,
        public roleservice: RoleService
    ) {
        if (localStorage.getItem('token')) {
            const AuthUser = localStorage.getItem('token');
            if (AuthUser) {
                this.router.navigate(['/']);
            }
        }
        this.registerFormErrors = {
            firstname: {},
            lastname: {},
            email: {},
            password: {},
            rpassword: {}
        };
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            rpassword: ['', [Validators.required, , confirmPassword]]
        });

        this.registerForm.valueChanges.subscribe(() => {
            this.onRegisterFormValuesChanged();
        });
    }

    onRegisterFormValuesChanged() {

        for (const field in this.registerFormErrors) {
            if (!this.registerFormErrors.hasOwnProperty(field)) {
                continue;
            }
            // Clear previous errors
            this.registerFormErrors[field] = {};
            // Get the control
            const control = this.registerForm.get(field);

            if (control && control.dirty && !control.valid) {
                this.registerFormErrors[field] = control.errors;
            }
        }
    }

    userregister() {
        this.user.status = 2;
        this.user.role = 2;
        this.authenticationService.user_register(this.user).subscribe(response => {
            const user = response;
            this.router.navigate(['/login']);
        }, error => {
            this.errors = error.msg;
        });
    }
}

/**
 * Confirm password
 *
 * @param {AbstractControl} control
 * @returns {{passwordsNotMatch: boolean}}
 */
function confirmPassword(control: AbstractControl): any {
    if (!control.parent || !control) {
        return;
    }

    const password = control.parent.get('password');
    const rpassword = control.parent.get('rpassword');

    if (!password || !rpassword) {
        return;
    }

    if (rpassword.value === '') {
        return;
    }

    if (password.value !== rpassword.value) {
        return {
            passwordsNotMatch: true
        };
    }
}
