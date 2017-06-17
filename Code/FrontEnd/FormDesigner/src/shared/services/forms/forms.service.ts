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
import { Tab } from "shared/models/Tab";
import { Row } from "shared/models/Row";
import { DropdownField } from "shared/models/DropdownField";
import { RadiobuttonField } from "shared/models/RadiobuttonField";
import { KeyValuePair } from "shared/Models/KeyValuePair";
import { LongTextField } from "shared/models/LongTextField";
import { IValidator } from "shared/models/IValidator";


@Injectable()
export class FormsService extends ServiceBase {
    private _formSaveUrl:string = '/form/meta';
    private _getFormsUrl:string = `/forms/0`;
    private _getFormMetaUrl:string = `/form/meta/`;

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
    let url = this._baseUrl + this._getFormsUrl;    
    
    return this.get(url)
               .map((response:Response) => {return <Form[]>this._getFormsResponse(response)})
               .catch(this.handleError);
  }

  /**
   * Gets form meta for a given form request
   */
  public getFormMeta(formRequest:FormRequest):Observable<Form>{
    let url = this._baseUrl + this._getFormMetaUrl + formRequest.FormId;
    return this.get(url)
               .map((response:Response) => {return <Form>this._handleFormMetaResponse(response)})
               .catch(this.handleError);
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

    

    private _mapPostResponse(response:Response):ResponseBase{
        let json = response.json();
        let responseBase = new ResponseBase();
        responseBase.isSuccess = json.isSuccess;
        responseBase.message = json.message;

        return responseBase;
    }

    private _handleFormMetaResponse(response:Response):Form{
        let json = response.json().data[0];
        let form = new Form();
        form.id = json.id;
        form.name =  json.name,
        //form.source = json.source,
        form.tabs =  this._getTabs(json);


        // create IForm object
        return form;

    }

    private _getTabs(json:any):Tab[]{
        let tabs:Tab[] = [];

        for(let tab of json.tabs){
            let tabControl = new Tab();
            tabControl.id = tab.id,
            tabControl.name =  tab.name,
            tabControl.ordinal = tab.ordinal,
            tabControl.rows = this._getRows(tab.rows)
            tabs.push(tabControl);
        }

        return tabs;
    }

    private _getRows(rowsJson:any):Row[]{
        let rows:Row[] = [];
        for(let row of rowsJson){
            let rowObj = new Row();
            rowObj.rowType = row.rowType;
            rowObj.id = row.id;
            rowObj.fields = this._getFields(row);

            rows.push(rowObj);
        }
        return rows;
    }

    private _getFields(tab:any):FieldBase[]{
        let fields:FieldBase[] = [];
        for(let field of tab.fields){
           
            let fieldControl = this._createField(field);
            fields.push(fieldControl);
        }

        return fields;
    }

     private _createField(field:any):FieldBase{
        let fieldControl:any;
        switch(field.type){
            case FieldType.Dropdown:
                fieldControl = new DropdownField();
                fieldControl.values = this._getDropdownValues(field);
                break;
            case FieldType.Radio:
                fieldControl = new RadiobuttonField();
                fieldControl.values = this._getDropdownValues(field);
                break;
            case FieldType.LongText:
                fieldControl = this._createLongTextField(field);
                break;
            default:
                fieldControl = new FieldBase();
                break;
            
        }

        this._setCommonProperties(fieldControl,field);
        return fieldControl;
    }

    private _setCommonProperties(fieldControl:FieldBase,field:any){
        fieldControl.id = field.id;
        fieldControl.label = field.label;
        fieldControl.name = field.name;
        fieldControl.required = field.required;
        fieldControl.type = field.type;
        fieldControl.value = field.value;
        fieldControl.readOnly = field.readOnly ? field.readOnly: false;

        fieldControl.validators = this._addValidators(field);

    }

    private _getDropdownValues(field:any):KeyValuePair[]{
        let pairs:KeyValuePair[] = [];
        let values = field.values;
        let length = values.length;
        for(let i=0;i<length;i++){
           let pair = new KeyValuePair();
           pair.key = values[i].key;
           pair.value = values[i].value;

           pairs.push(pair);
        }
        return pairs;
    }

    private _createLongTextField(field:any):LongTextField{
        let longTextField = new LongTextField();
        longTextField.rows = +field.rows;
        longTextField.columns = +field.columns;

        return longTextField;
    }

    private _addValidators(field:any):IValidator[]{
        let validators:IValidator[] = [];
        let values = field.validators;
        if(values == null){
            return validators;
        }
        let length = values.length;
        for(let i=0;i<length;i++){
            let validator:IValidator={
                key : values[i].name,
                validatorData:values[i].value
            };

            validators.push(validator);
        }

        return validators;
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
