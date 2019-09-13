import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private _router: Router) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });


        return next.handle(request)
            .map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse && ~~(event.status / 100) > 3) {
                    //                    console.info('HttpResponse::event =', event, ';');
                } else {
                    //                    console.info('event =', event, ';');
                }
                return event;
            })
            .do((res) => {
                //                console.log(res);
            }).catch((error) => {
                if (error instanceof HttpErrorResponse) {
                    if (error.status === 401) {
                        this._router.navigate(['/login']);
                    }
                }
                return ErrorObservable.create(error['error']);
            }).finally(() => {

            });

    }
}
