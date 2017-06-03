import { Tab } from './Tab';
import { ObjectBase } from "shared/models/ObjectBase";


export class Form extends ObjectBase{
    source:String;
    tabs:Tab[];
}