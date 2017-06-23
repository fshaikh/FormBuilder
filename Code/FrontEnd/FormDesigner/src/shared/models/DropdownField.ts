import {FieldBase} from './FieldBase';
import {KeyValuePair} from './KeyValuePair';

export class DropdownField extends FieldBase{
    values:KeyValuePair[];

    public getIcon():string{
        return "icon-chevron-circle-down";
    } 
}