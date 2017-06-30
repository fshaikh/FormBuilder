import { AbstractControl, FormGroup } from '@angular/forms';
import { FieldBase } from "shared/models/FieldBase";
import { KeyValuePairGeneric } from "shared/Models/KeyValuePair";


export abstract class FormPropertyComponentBase{
    _formGroup:FormGroup;

    public abstract getFormControls(fieldControl:FieldBase,fromGroup:FormGroup):KeyValuePairGeneric<string,AbstractControl>[];
    public abstract processModel(args:any):void;

    getFormControlPair(key:string,formControl:AbstractControl):KeyValuePairGeneric<string,AbstractControl>{
       let pair = new KeyValuePairGeneric<string,AbstractControl>();
       pair.key = key;
       pair.value = formControl;

       return pair;
    }
}