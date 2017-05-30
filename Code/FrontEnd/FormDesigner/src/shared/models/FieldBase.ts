import {FieldType} from './FieldType';
import {IValidator} from './IValidator';
import {RowType} from './RowType';


export class FieldBase{
    id:string;
    name:string;
    label:string;
    type:FieldType;
    required:Boolean;
    value:any;
    readOnly:Boolean = false;
    layoutType:RowType;
    validators:IValidator[]
}

