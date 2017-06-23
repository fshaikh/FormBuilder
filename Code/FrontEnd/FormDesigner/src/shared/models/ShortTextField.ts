/**
 * This class reprsents a short text field definition
 */

import { FieldBase } from "shared/models/FieldBase";

export class ShortTextField extends FieldBase {
    public minLength: number;
    public maxLength:number;

     public getIcon():string{
        return "icon-character";
    } 
}