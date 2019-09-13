import {Injectable} from "@angular/core";
import {AppConstants} from "../constants/app.constants";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class Contact_formService {
    constructor(private http:HttpClient){

    }
    getContact_form(contact_forms) {
        return this.http.post<any>(AppConstants.SITE_URL + 'contact_form/get_contact_forms', contact_forms);
    }
    getContact_formById(id) {
        return this.http.post<any>(AppConstants.SITE_URL + 'contact_form/get_contact_form', { id: id });
    }
    saveContact_form(contact_form) {
        return this.http.post<any>(AppConstants.SITE_URL + 'contact_form/save_contact_form', contact_form);
    }
    deleteContact_form(contact_form) {
        return this.http.post<any>(AppConstants.SITE_URL + 'contact_form/delete_contact_form', { id: contact_form });
    }

}