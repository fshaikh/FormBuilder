import { Row } from './Row';
import { ObjectBase } from "shared/models/ObjectBase";



export class Tab extends ObjectBase{
    ordinal:Number;
    rows:Row[];
}