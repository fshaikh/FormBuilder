import { FieldBase } from "shared/models/FieldBase";
import { FieldType } from "shared/models/FieldType";

export class IconFactory {
    public static getIcon(control:FieldBase):string{
        let icon:string = "";
        switch(control.type){
            case FieldType.ShortText:
                icon = "icon-character";
                break;
            case FieldType.Checkbox:
                icon = "icon-checkbox";
                break;
            case FieldType.Dropdown:
                icon = "icon-chevron-circle-down";
                break;
            case FieldType.LongText:
                icon = "icon-text-height";
                break;
            case FieldType.Radio:
                icon = "icon-ios-circle-filled";
                break;
            case FieldType.Date:
                icon = "icon-calendar";
                break;
        }
        return icon;
    }
}