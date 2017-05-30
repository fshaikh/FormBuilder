import {Row} from './Row';

export interface ITab{
    id:String,
    name:String,
    ordinal:Number,
    rows:Row[]
}

export class Tab implements ITab{
    id:String;
    name:String;
    ordinal:Number;
    rows:Row[];
}