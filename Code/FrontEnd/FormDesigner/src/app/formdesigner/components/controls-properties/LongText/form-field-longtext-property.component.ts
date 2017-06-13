import {Component,OnInit} from '@angular/core';
import {FormControl,FormGroup,AbstractControl} from '@angular/forms';
import { FormPropertyComponentBase } from '../FormPropertyComponentBase';
import { FieldBase } from "shared/models/FieldBase";
import { KeyValuePairGeneric } from "shared/Models/KeyValuePair";
import FormHelper from "app/formdesigner/service/FormHelper";


@Component({
    selector:'fd-longtext-property',
    templateUrl:'./form-field-longtext-property.component.html',
    styleUrls:['./form-field-longtext-property.component.scss']
})
export class LongTextPropertyComponent extends FormPropertyComponentBase{
    ROWS:number = 3;
    COLUMNS:number = 5;
    MIN_ROWS:number = 1;
    MIN_COLUMNS:number = 1;
    MAX_ROWS:number = 100;
    MAX_COLUMNS:number = 100;
    ROWS_NAME:string = "rows";
    COLUMNS_NAME:string = "columns";
    //_formGroup:FormGroup;

    public getFormControls(fieldControl:FieldBase,formGroup:FormGroup):KeyValuePairGeneric<string,AbstractControl>[]{
        let map:KeyValuePairGeneric<string,AbstractControl>[] = [];
        // rows
        let rowsFormControl:FormControl = new FormControl(FormHelper.getFormControlState(this.ROWS,false));
        map.push(this.getFormControlPair(this.ROWS_NAME,rowsFormControl));

        // columns
        let columnsFormControl:FormControl = new FormControl(FormHelper.getFormControlState(this.COLUMNS,false));
        map.push(this.getFormControlPair(this.COLUMNS_NAME,columnsFormControl));

        this._formGroup = formGroup;

        return map;
    }

    public processModel(args:any):void{
        args.rows = args.rows ? +args.rows : this.ROWS;
        args.columns = args.columns ? +args.columns : this.COLUMNS;
    }


}