import {EventArgs} from './EventArgs';
import {FieldBase} from './FieldBase';
import {RowAction} from './RowAction';

export class FieldControlAddEventArgs extends EventArgs{
    constructor(){
        super();
    }

    public rowId:string;
    public field:FieldBase;
    public rowAction: RowAction;
    public ignoreOp:boolean = true;
}