import {Component,OnInit} from '@angular/core';
import {FormControl,FormGroup,AbstractControl} from '@angular/forms';

import { FormPropertyComponentBase } from '../FormPropertyComponentBase';
import { FieldBase } from "shared/models/FieldBase";
import { KeyValuePairGeneric } from "shared/Models/KeyValuePair";
import FormHelper from "app/formdesigner/service/FormHelper";
import { ShortTextField } from "shared/models/ShortTextField";
import { FieldType } from "shared/models/FieldType";

@Component({
    selector:'fd-shorttext-property',
    templateUrl:'./form-field-shorttext-property.component.html',
    styleUrls:['./form-field-shorttext-property.component.scss']
})
export class ShortTextPropertyComponent extends FormPropertyComponentBase{
    MINLENGTH:number = 3;
    MIN_LENGTH:number = 1;
    MAX_LENGTH:number = 1000;
    MINLENGTH_NAME:string = "minLength";
    MAXLENGTH_NAME:string = "maxLength";
    _formGroup:FormGroup;
    _fieldControl:ShortTextField;

    public getFormControls(fieldControl:ShortTextField,formGroup:FormGroup):KeyValuePairGeneric<string,AbstractControl>[]{
        let map:KeyValuePairGeneric<string,AbstractControl>[] = [];
        this._formGroup = formGroup;
        this._fieldControl = fieldControl;
        
        // minimum length
        let minLengthFormControl:FormControl = new FormControl(FormHelper.getFormControlState(this._getMinValue() ,false));
        map.push(this.getFormControlPair(this.MINLENGTH_NAME,minLengthFormControl));

        // maximum length
        let maxLengthFormControl:FormControl = new FormControl(FormHelper.getFormControlState(this._getMaxValue(),false));
        map.push(this.getFormControlPair(this.MAXLENGTH_NAME,maxLengthFormControl));

        
        return map;
    }

    public processModel(args: any): void {
        if(args.type !== FieldType.ShortText){
            return;
        }
        args.validators = [
            {
                "name":this.MINLENGTH_NAME,
                "value":{"length":args.minLength}
            },
            {
                "name":this.MAXLENGTH_NAME,
                "value":{"length":args.maxLength}
            }
        ];
   }
   
   _getMinValue():number{
    return this._fieldControl.minLength ? this._fieldControl.minLength : this.MIN_LENGTH;
   }
    
   _getMaxValue():number{
    return this._fieldControl.maxLength ? this._fieldControl.maxLength : this.MAX_LENGTH;
   }
}