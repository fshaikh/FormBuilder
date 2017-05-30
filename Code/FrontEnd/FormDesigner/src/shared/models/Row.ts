import {RowType} from './RowType';
import {FieldBase} from './FieldBase';

export class Row{
    id:string;
    rowType:RowType;
    fields:FieldBase[];
}