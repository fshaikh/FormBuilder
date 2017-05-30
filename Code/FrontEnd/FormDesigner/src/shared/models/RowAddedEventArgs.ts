import {EventArgs} from './EventArgs';

export class RowAddedEventArgs extends EventArgs{
    constructor(){
        super();
    }

    public Id:string;
}