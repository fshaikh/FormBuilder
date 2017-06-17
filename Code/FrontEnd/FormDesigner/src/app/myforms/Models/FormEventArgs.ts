import { EventArgs } from "shared/models/EventArgs";
import { Form } from "shared/models/Form";
import { ActionType } from "app/myforms/Models/ActionType";

export class FormEventArgs extends EventArgs {
    constructor(){
        super();
    }
    public form:Form;
    public actionType:ActionType;
}