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
import { FieldBase } from "shared/models/FieldBase";
import { FieldType } from "shared/models/FieldType";
import { FormRequest } from "shared/models/FormRequest";
import { ResponseBase } from "shared/models/ResponseBase";
import { HttpHelper } from "shared/utils/HttpHelper";


@Injectable()
export class FormsService extends ServiceBase {
    private _formSaveUrl:string = '/form/meta';
    private _getFormsUrl:string = `/forms/0`;
    private _getFormMetaUrl:string = '/form/meta/';

    private _formState:Form;


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

  /**
   * Gets the Controls
   */
  public getControls():FieldBase[]{
        let _controls:FieldBase[] = [];

        // Create all supported controls and add. Is there a better way?
        // Short text
        _controls.push(this._getControl("shortText","Short Text",FieldType.ShortText));
        // Long text
        _controls.push(this._getControl("longText","Long Text",FieldType.LongText));
        // Drop down
        _controls.push(this._getControl("dropDown","Drop Down",FieldType.Dropdown));
        // Radio
        _controls.push(this._getControl("radio","Radio Buttons",FieldType.Radio));
        // Date
        _controls.push(this._getControl("date","Date",FieldType.Date));
        // Checkox
        _controls.push(this._getControl("checkbox","Checkbox",FieldType.Checkbox));

        return _controls;
    }

    /**
     * Saves form meta
     * @param formRequest Form Request
     */
    public saveFormMeta(formRequest:FormRequest):Observable<ResponseBase>{
        let url = this._baseUrl + this._formSaveUrl;

        return this.post(url,formRequest.Form)
                          .map((response:Response) => {return <ResponseBase>this._mapPostResponse(response)});
    }

    public saveFormState(form:Form){
        this._formState = form;
    }

    public getFormState(formId:String): Form{
        if(formId === "0"){
            return this._formState;
        }
        // else fetch from server

    }

    private _mapPostResponse(response:Response):ResponseBase{
        let json = response.json();
        let responseBase = new ResponseBase();
        responseBase.isSuccess = json.isSuccess;
        responseBase.message = json.message;

        return responseBase;
    }


     private _getControl(name:string,label:string,type:FieldType):FieldBase{
        let fieldControl = new FieldBase();
        fieldControl.name = name;
        fieldControl.label = label;
        fieldControl.type = type;

        return fieldControl;
    }

  private handleError(error:Response):any{
        console.log(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    

}
