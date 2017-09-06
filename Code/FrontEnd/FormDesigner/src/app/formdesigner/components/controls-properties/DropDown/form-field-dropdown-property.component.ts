import {Component,OnInit} from '@angular/core';
import {FormControl,FormGroup,AbstractControl,FormArray} from '@angular/forms';
import { FormPropertyComponentBase } from '../FormPropertyComponentBase';
import { FieldBase } from "shared/models/FieldBase";
import { KeyValuePairGeneric, KeyValuePair } from "shared/Models/KeyValuePair";
import FormHelper from "app/formdesigner/service/FormHelper";
import { DropdownField } from "shared/models/DropdownField";
import { FieldType } from "shared/models/FieldType";

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
    kvPairs:KeyValuePair[] = [];

    public getFormControls(fieldControl:DropdownField,formGroup:FormGroup):KeyValuePairGeneric<string,AbstractControl>[]{
        let map:KeyValuePairGeneric<string,AbstractControl>[] = [];

        this.kvPairs = fieldControl.values ? fieldControl.values : [];
        let length = this.kvPairs.length;
        let formControls = [];
        for (let index = 0; index < length; index++) {
            let element = this.kvPairs[index];
            formControls.push(this._buildKeyValuePairFormGroup(element));
        }
        this.formArray = new FormArray(formControls);
        map.push(this.getFormControlPair(this.FORMARRAY_NAME,this.formArray));

        this._formGroup = formGroup;

        return map;
    }

    public processModel(args:any):void{
        if(args.type !== FieldType.Dropdown){
            return;
        }
        args.values = this.kvPairs;
    }

    onAdd(e:any):void{
        let kvPair:KeyValuePair = new KeyValuePair();
        kvPair.key = "";
        kvPair.value = "";
        this.formArray.push(this._buildKeyValuePairFormGroup(kvPair));
    }

    onRemove(index:number):void{
        this.formArray.removeAt(index);
    }

    getFormControlKey(kvPair:FormGroup,index:number):any{
        let value:any = kvPair.getRawValue();
        let i:number = 0;
       for (var key in value) {
           if (value.hasOwnProperty(key)) {
               var element = value[key];
               if(i === index){
                   return element;
               }
               i++;
           }
       }
    }



    _buildKeyValuePairFormGroup(keyValuePair:KeyValuePair):FormGroup{
        let dropDownPairFormGroup:FormGroup = new FormGroup({});

        // Key Form Control
        let keyFormControl:FormControl = new FormControl(FormHelper.getFormControlState(keyValuePair.key,false));
        dropDownPairFormGroup.addControl(keyValuePair.key,keyFormControl);
        
        // Value Form Control
        let valueFormControl:FormControl = new FormControl(FormHelper.getFormControlState(keyValuePair.value,false));
        dropDownPairFormGroup.addControl(keyValuePair.value,valueFormControl);

        return dropDownPairFormGroup;
    }


}