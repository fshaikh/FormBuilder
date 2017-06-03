import {RowType} from './RowType';
import { FieldBase } from './FieldBase';
import { ObjectBase } from "shared/models/ObjectBase";

export class Row extends ObjectBase{
    rowType:RowType;
    fields:FieldBase[];
}