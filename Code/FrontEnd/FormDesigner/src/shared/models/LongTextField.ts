import {FieldBase} from './FieldBase';


export class LongTextField extends FieldBase{
    rows:number;
    columns:number;

    public getIcon():string{
        return "icon-text-height";
    } 
}