/**
 * Route resolver for Form Renderer. Fetches the meta from server for rendering
 */

import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Form } from "shared/models/Form";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { FormsService } from "shared/services/forms/forms.service";

@Injectable()
export class FormRendererRouteResolver implements Resolve<Form>{
    constructor(private _formService:FormsService){
        // Do nothing
    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Form | Observable<Form> | Promise<Form> {
        let formId:string = route.params.id;  
        return this._formService.getFormState(formId);  

    }
}