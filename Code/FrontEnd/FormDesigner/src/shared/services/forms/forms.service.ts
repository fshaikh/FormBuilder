/**
 * Forms Service. Provides functions to:
 * 1. Get Forms for a user/guest
 * 2. Get Form Meta for a form based on form id
 * 3. Save Form Meta for a new form
 * 4. Save form meta for an existing form
 * 5. Delete a form
 * 6. Save Form Data
 * 7. Get Form Data
 */

import { Injectable } from '@angular/core';
import { Http,Response,RequestOptionsArgs } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

import { Form } from "shared/models/Form";
import { ServiceBase } from "shared/services/ServiceBase";


@Injectable()
export class FormsService extends ServiceBase {
    private _formSaveUrl:string = '/form/meta';
    private _getFormsUrl:string = `/forms/0`;
    private _getFormMetaUrl:string = '/form/meta/';


   /**
    * Initializes a new instance of FormsService
    */
  constructor(http:Http) {
    super(http);
   }

  /**
   * Get Forms for a user/guest
  */
  public getForms():Observable<Form[]>{
    let forms = [];
    let url = this._baseUrl + this._getFormsUrl;    
    
    return this.get(url)
               .map((response:Response) => {return <Form[]>this._getFormsResponse(response)})
               .catch(this.handleError);
  }

  private _getFormsResponse(response:Response):Form[]{
        let json = response.json().data;
        let forms:Form[] = [];

        for(let form of json){
            let formObj = new Form();
            formObj.id = form.id;
            formObj.name = form.name;

            forms.push(formObj);
        }
        return forms;
  }

  private handleError(error:Response):any{
        console.log(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    

}
