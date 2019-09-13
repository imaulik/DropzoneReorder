import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../constants/app.constants';
import { Observable } from 'rxjs';


@Injectable()
export class FileUploadService {
    _url: string;
    headers: any;
    constructor(private http: HttpClient) {

    }

    uploadImage(data: any): Observable<{}> {
        this._url = AppConstants.SITE_URL + 'upload/uploadImages';
        return this.http.post(this._url, data)
            .map(this.handleData)
            .catch(this.handleError);
    }

    uploadFile(data: any): Observable<{}> {
        this._url = AppConstants.SITE_URL + 'upload/uploadFile';
        console.log(data);
        return this.http.post(this._url, data)
            .map(this.handleData)
            .catch(this.handleError);
    }
    postFile(fileToUpload: File): Observable<{}> {
        const endpoint = AppConstants.SITE_URL + 'upload/uploadFile';
        const formData: FormData = new FormData();
        formData.append('file', fileToUpload, fileToUpload.name);
        return this.http
            .post(endpoint, formData)
            .map(this.handleData)
            .catch(this.handleError);
    }
    downloadImage(imageUrl: string) {
        return this.http.get(imageUrl, { observe: 'response', responseType: 'blob' })
            .map((res) => {
                return new Blob([res.body], { type: res.headers.get('Content-Type') });
            });
    }

    private handleData(res: Response) {
        const data = res;
        return data;
    }
    private handleError(error: Response | any) {
        return Observable.throw('API failed');
    }
}
