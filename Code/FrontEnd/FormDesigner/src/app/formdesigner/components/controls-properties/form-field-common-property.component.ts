import {Component,OnInit} from '@angular/core';
import {FormControl,FormGroup,AbstractControl} from '@angular/forms';
import { FormPropertyComponentBase } from './FormPropertyComponentBase';
import { FieldBase } from "shared/models/FieldBase";
import { KeyValuePairGeneric } from "shared/Models/KeyValuePair";

@Component({
    selector:'common-property',
    template:'',
    styleUrls:['./form-field-property-common.scss']
})
export class CommonPropertyComponent extends FormPropertyComponentBase{
    public getFormControls(fieldControl:FieldBase,formGroup:FormGroup):KeyValuePairGeneric<string,AbstractControl>[]{
        let map:KeyValuePairGeneric<string,AbstractControl>[] = [];
        

        return map;
    }

    public processModel(args: any): void {
            // Do nothing
   }
}