import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService, LoaderService } from '../../../services/index';

@Component({
    templateUrl: 'reset.component.html',
    providers: [AuthenticationService]
})
export class ResetComponent implements OnInit {
    resetForm: FormGroup;
    resetFormErrors: any;
    user: any = {};
    user_filter: any = {};
    errors = '';
    sub;
    token = '';
    constructor(
        public authenticationService: AuthenticationService,
        private loaderService: LoaderService,
        private http: HttpClient,
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
    ) {
        this.resetFormErrors = {
            token: {},
            email: {},
            password: {},
            rpassword: {}
        };
    }
    ngOnInit() {
        this.resetForm = this.formBuilder.group({
            token: [{ value: '', disabled: true }, Validators.required],
            email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            rpassword: ['', [Validators.required, , confirmPassword]]
        });
        this.sub = this.route.params.subscribe(params => {
            this.token = params['token']; // (+) converts string 'id' to a number
        });
        this.loaderService.display(true);
        this.user_filter = { user_token: this.token };
        this.authenticationService.reset_password(this.user_filter).subscribe(response => {
            this.user.email = response['email'];
            this.user.token = this.token;
            this.loaderService.display(false);
            this.router.navigate(['/login']);
        }, error => {
            this.loaderService.display(false);
            this.errors = error.error;
        });

        this.resetForm.valueChanges.subscribe(() => {
            this.onResetFormValuesChanged();
        });
    }

    onResetFormValuesChanged() {

        for (const field in this.resetFormErrors) {
            if (!this.resetFormErrors.hasOwnProperty(field)) {
                continue;
            }
            // Clear previous errors
            this.resetFormErrors[field] = {};
            // Get the control
            const control = this.resetForm.get(field);

            if (control && control.dirty && !control.valid) {
                this.resetFormErrors[field] = control.errors;
            }
        }
    }

    SaveReset() {
        this.loaderService.display(true);
        this.authenticationService.reset_password_save(this.user).subscribe(response => {
            this.router.navigate(['/login']);
            this.loaderService.display(false);
        }, error => {
            this.loaderService.display(false);
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
