import { Form } from "shared/models/Form";

export class FormRequest {
    public Form :string;
    public FormId:string;
    public FetchData:Boolean = false;
}

export class DeleteFormRequest extends FormRequest{
    constructor() {
        super();

    }

    public IsSoftDelete:Boolean;
}