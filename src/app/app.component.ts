import { Component, AfterViewInit } from '@angular/core';
import { LoaderService } from './services/loader.service';
@Component({
    // tslint:disable-next-line
    selector: 'body',
    template: '<router-outlet></router-outlet>',
    //    styleUrls: ['./services/app.component.css']
    //    template: '<router-outlet><ngx-loading [show]="showloading" ></ngx-loading></router-outlet>'
})
export class AppComponent implements AfterViewInit {
    showLoader: boolean;

    constructor(
        private loaderService: LoaderService) {
    }

    ngAfterViewInit() {
        window.setTimeout(() => {
            this.loaderService.status.subscribe((val: boolean) => {
                this.showLoader = val;
            });
        });
    }
}
