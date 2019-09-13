import {Directive, ElementRef, OnInit, Input, Renderer} from '@angular/core';

@Directive({
    // tslint:disable-next-line:max-line-length
    selector: '[appHasAllPermissions]'
})
export class HasAllPermissionsDirective implements OnInit {

    constructor(private el: ElementRef, private renderer: Renderer) {}
    @Input() appHasAllPermissions: any[];
    user_permissions: any[];
    count: number = 0;
    // wait for the component to render completely
    
    ngOnInit() {
        this.user_permissions = JSON.parse(localStorage.getItem('permissions'));
        this.user_permissions.forEach(obj => {
            this.appHasAllPermissions.forEach(childObj => {
                if (childObj == obj.name) {
                    this.count++;
                } else {

                }
            });

        });
        if (this.count == this.appHasAllPermissions.length) {
            this.renderer.setElementStyle(this.el.nativeElement, 'display', 'block');
        } else {
            this.renderer.setElementStyle(this.el.nativeElement, 'display', 'none');
        }
    }
}
