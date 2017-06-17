/**
 * Route resolver for Form Designer. Fetches the form meta from server
 */

import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Form } from "shared/models/Form";
import { Observable } from "rxjs/Observable";
import { FormsService } from "shared/services/forms/forms.service";
import { FormRequest } from "shared/models/FormRequest";

@Injectable()
export class FormDesignerRouteResolver implements Resolve<Form>{

    constructor(private _formService:FormsService){
        // Do nothing
    }

    /**
     * 
     * @param route 
     * @param state 
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Form | Observable<Form> | Promise<Form> {
           let formId:string = route.params.id;
           let formName:string = route.params.name;
            // Read the form id from the route params. If its new return the new form object
            if(formId === '0'){
                let form:Form = new Form();
                form.id = formId;
                form.name = formName;
                return form;
            }
            // else call FormsService to fetch the form data
            let formRequest:FormRequest = new FormRequest();
            formRequest.FetchData = false;
            formRequest.FormId = formId;
            return this._formService.getFormMeta(formRequest);
        }


}