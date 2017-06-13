/**
 * Factory class for creating Field Property Component
 */


import { FieldBase } from "shared/models/FieldBase";
import { FieldType } from "shared/models/FieldType";
import { LongTextPropertyComponent } from "app/formdesigner/components/controls-properties/LongText/form-field-longtext-property.component";
import { ShortTextPropertyComponent } from "app/formdesigner/components/controls-properties/ShortText/form-field-shorttext-property.component";
import { DropDownPropertyComponent } from "app/formdesigner/components/controls-properties/DropDown/form-field-dropdown-property.component";
import { CommonPropertyComponent } from "app/formdesigner/components/controls-properties/form-field-common-property.component";

export class ControlPropertyComponentFactory {
    static getFieldPropertyControl(field:FieldBase):any{
        let component:any;
        switch(field.type){
            case FieldType.LongText:
                component =  LongTextPropertyComponent;
                break;
            case FieldType.ShortText:
                component = ShortTextPropertyComponent;
                break;
            case FieldType.Dropdown:
            case FieldType.Radio:
                component = DropDownPropertyComponent;
                break;
            default:
                component = CommonPropertyComponent;
                break;
           
        }

        return component;
    }
}