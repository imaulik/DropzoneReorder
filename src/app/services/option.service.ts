import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../constants/app.constants';
import { Options } from '../models/options.model';

@Injectable()
export class OptionService {
    constructor(private http: HttpClient) {
    }

    getSelectOption(id) {
        return this.http.post<any>(AppConstants.SITE_URL + 'option_master/get_select_options', { id: id });
    }
    get_option_masters(options: Options) {
        return this.http.post<any>(AppConstants.SITE_URL + 'option_master/get_option_masters', options);
    }
    getOptionById(id) {
        return this.http.post<any>(AppConstants.SITE_URL + 'option_master/get_option_master', { id: id });
    }
    saveOption(options) {
        return this.http.post<any>(AppConstants.SITE_URL + 'option_master/save_option_master', options);
    }
}

