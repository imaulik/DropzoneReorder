import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RoleService, LoaderService, OptionService } from '../../../services/index';
import { AppConstants } from '../../../constants/app.constants';
import { LazyLoadEvent } from '../../../models/index';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
    templateUrl: 'role-view.component.html',
})
export class RoleViewComponent implements OnInit {
    used_role: any = {};
    role: any = {};
    IMAGE_URL;
    sub;
    id;
    permissions = [];

    constructor(
        public loaderService: LoaderService,
        public optionservice: OptionService,
        private route: ActivatedRoute,
        public router: Router,
        public roleservice: RoleService
    ) {
        this.IMAGE_URL = AppConstants.IMAGE_URL;


    }

    ngOnInit() {
        this.role = {};
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id']; // (+) converts string 'id' to a number
        });
        if (this.id) {
            this.loaderService.display(true);
            this.roleservice.getRole_permission(this.id).subscribe(response => {
                    this.used_role = response;
                    this.permissions = this.used_role.permissions;
                    this.role = this.used_role;
                    this.loaderService.display(false);
            }, error => {
                this.loaderService.display(false);
            });
        } else {
            this.loaderService.display(true);
            this.roleservice.getAllPermissions().subscribe(response => {
                    this.permissions = response;
                    this.loaderService.display(false);
            }, error => {
                this.loaderService.display(false);
            });
        }
    }


    cancel() {
        this.router.navigate(['/setting/roles']);
    }

}
