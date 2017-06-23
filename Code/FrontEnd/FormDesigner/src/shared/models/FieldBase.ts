import {FieldType} from './FieldType';
import {IValidator} from './IValidator';
import { RowType } from './RowType';
import { ObjectBase } from "shared/models/ObjectBase";


export class FieldBase extends ObjectBase{
    label:string;
    type:FieldType;
    required:Boolean;
    value:any;
    readOnly:Boolean = false;
    layoutType:RowType;
    validators:IValidator[]

    public getIcon():string{
        return "";
    }
}

