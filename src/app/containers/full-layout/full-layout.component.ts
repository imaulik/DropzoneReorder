import { Component, AfterViewInit } from '@angular/core';
import { LoaderService } from '../../services/index';
@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html'
})
export class FullLayoutComponent {
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
