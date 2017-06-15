import { FieldBase } from "shared/models/FieldBase";
import { FieldType } from "shared/models/FieldType";
import { ShortTextUIFieldComponent } from "formrenderer/controls/shorttext/shorttext-field.component";
import { LongTextUIFieldComponent } from "formrenderer/controls/longtext/longtext-field.component";
import { CheckboxUIFieldComponent } from "formrenderer/controls/checkbox/checkbox-field.component";
import { DropdownUIFieldComponent } from "formrenderer/controls/dropdown/dropdown-field.component";
import { RadiobuttonUIFieldComponent } from "formrenderer/controls/radiobutton/radiobutton-field.component";
import { DateUIFieldComponent } from "formrenderer/controls/date/date-field.component";

export class FieldComponentFactory {
    static getFieldControl(field:FieldBase):any{
        let component:any;
        switch(field.type){
            case FieldType.ShortText:
                component =  ShortTextUIFieldComponent;
                break;
            case FieldType.LongText:
                component = LongTextUIFieldComponent;
                break;
            case FieldType.Checkbox:
                component = CheckboxUIFieldComponent;
                break;
            case FieldType.Dropdown:
                component = DropdownUIFieldComponent;
                break;
            case FieldType.Radio:
                component = RadiobuttonUIFieldComponent;
                break;
            case FieldType.Date:
                component = DateUIFieldComponent;
                break;
        }

        return component;
    }
}