import {Component,OnInit} from '@angular/core';
import {FormControl,FormGroup,AbstractControl,FormArray} from '@angular/forms';
import { FormPropertyComponentBase } from '../FormPropertyComponentBase';
import { FieldBase } from "shared/models/FieldBase";
import { KeyValuePairGeneric } from "shared/Models/KeyValuePair";
import FormHelper from "app/formdesigner/service/FormHelper";

@Component({
    selector:'fddropdown-property',
    templateUrl:'./form-field-dropdown-property.component.html',
    styleUrls:['./form-field-dropdown-property.component.scss']
})
export class DropDownPropertyComponent extends FormPropertyComponentBase{
    formArray:FormArray;
    FORMARRAY_NAME:string = "values";
    KEY_NAME:string = "key";
    VALUE_NAME:string = "value";

    public getFormControls(fieldControl:FieldBase,formGroup:FormGroup):KeyValuePairGeneric<string,AbstractControl>[]{
        let map:KeyValuePairGeneric<string,AbstractControl>[] = [];
        
        this.formArray = new FormArray([this._buildKeyValuePairFormGroup()]);
        map.push(this.getFormControlPair(this.FORMARRAY_NAME,this.formArray));

        this._formGroup = formGroup;

        return map;
    }

    public processModel(args:any):void{
        // Do nothing
    }

    onAdd(e:any):void{
        this.formArray.push(this._buildKeyValuePairFormGroup());
    }

    onRemove(index:number):void{
        this.formArray.removeAt(index);
    }

    _buildKeyValuePairFormGroup():FormGroup{
        let dropDownPairFormGroup:FormGroup = new FormGroup({});

        // Key Form Control
        let keyFormControl:FormControl = new FormControl(FormHelper.getFormControlState('',false));
        dropDownPairFormGroup.addControl(this.KEY_NAME,keyFormControl);
        
        // Value Form Control
        let valueFormControl:FormControl = new FormControl(FormHelper.getFormControlState('',false));
        dropDownPairFormGroup.addControl(this.VALUE_NAME,valueFormControl);

        return dropDownPairFormGroup;
    }


}