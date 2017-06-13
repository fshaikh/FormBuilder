import {Component,OnInit} from '@angular/core';
import {FormControl,FormGroup,AbstractControl} from '@angular/forms';

import { FormPropertyComponentBase } from '../FormPropertyComponentBase';
import { FieldBase } from "shared/models/FieldBase";
import { KeyValuePairGeneric } from "shared/Models/KeyValuePair";
import FormHelper from "app/formdesigner/service/FormHelper";

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

    public getFormControls(fieldControl:FieldBase,formGroup:FormGroup):KeyValuePairGeneric<string,AbstractControl>[]{
        let map:KeyValuePairGeneric<string,AbstractControl>[] = [];
        
        // minimum length
        let minLengthFormControl:FormControl = new FormControl(FormHelper.getFormControlState(this.MINLENGTH,false));
        map.push(this.getFormControlPair(this.MINLENGTH_NAME,minLengthFormControl));

        // maximum length
        let maxLengthFormControl:FormControl = new FormControl(FormHelper.getFormControlState(this.MINLENGTH,false));
        map.push(this.getFormControlPair(this.MAXLENGTH_NAME,maxLengthFormControl));

        this._formGroup = formGroup;
        return map;
    }

    public processModel(args: any): void {
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
}