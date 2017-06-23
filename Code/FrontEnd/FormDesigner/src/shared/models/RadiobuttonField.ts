import {FieldBase} from './FieldBase';
import {KeyValuePair} from './KeyValuePair';

export class RadiobuttonField extends FieldBase{
    values:KeyValuePair[];

     public getIcon():string{
        return "icon-ios-circle-filled";
    } 
}