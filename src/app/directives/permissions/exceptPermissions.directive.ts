import {Directive, ElementRef, OnInit, Input, Renderer} from '@angular/core';

@Directive({
    // tslint:disable-next-line:max-line-length
    selector: '[appExceptPermissions]'
})
export class ExceptPermissionsDirective implements OnInit
{

    constructor(private el: ElementRef, private renderer: Renderer) {}
    @Input() appExceptPermissions: any[];
    user_permissions: any[];
    count: number = 0;
    // wait for the component to render completely
    ngOnInit()
    {
        this.user_permissions = JSON.parse(localStorage.getItem('permissions'));

        this.user_permissions.forEach(obj =>
        {
            this.appExceptPermissions.forEach(childObj =>
            {
                if (childObj == obj.name)
                {
                    this.count++;
                } else
                {

                }
            });

        });
        if (this.count == 0)
        {
            this.renderer.setElementStyle(this.el.nativeElement, 'display', 'block');
        } else
        {
            this.renderer.setElementStyle(this.el.nativeElement, 'display', 'none');
        }
    }
}
