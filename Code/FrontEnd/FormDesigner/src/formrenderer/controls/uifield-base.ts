import {Component,OnInit,Input} from '@angular/core';

import { FormGroup } from '@angular/forms';
import { FieldBase } from "shared/models/FieldBase";

// Base class for all UI field controls
export abstract class UIFieldBase{
    @Input() field:FieldBase;
    @Input() formGroup:FormGroup;

    protected static _styleUrls:string[] = ['../control-styles.scss'];

    protected getFormControlName():String{
        return this.field.name;
    }

    protected  getLabelValue():String{
        let value = this.field.value;
        return value ? value: "";
    }

}