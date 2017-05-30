import {ITab} from './ITab';

export interface IForm{
    id:String,
    name:String,
    source:String,
    tabs:ITab[]
}

export class Form implements IForm{
    id:String;
    name:String;
    source:String;
    tabs:ITab[];
}