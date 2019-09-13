import {Directive, ElementRef, OnInit, Input, Renderer} from '@angular/core';

@Directive({
    // tslint:disable-next-line:max-line-length
    selector: '[appHasRole]'
})
export class RoleCheckDirective implements OnInit {

    constructor(private el: ElementRef, private renderer: Renderer) {}
    @Input() appHasRole: any[];
    user_role : string;
    count : number = 0;
    // wait for the component to render completely
    ngOnInit() {
        this.user_role = JSON.parse(localStorage.getItem('role'))[0]['name'];
        this.appHasRole.forEach(obj=>{
            if(this.user_role==obj){
                
            }else{
                this.count++;
            }
        });
        if(this.count==0){
            this.renderer.setElementStyle(this.el.nativeElement, 'display', 'block');
        }else{
            this.renderer.setElementStyle(this.el.nativeElement, 'display', 'none');
        }
    }
}
