export class FormRequest{
    public Form :String;
    public FormId:string;
    public FetchData:Boolean = false;
}

export class DeleteFormRequest extends FormRequest{
    constructor() {
        super();

    }

    public IsSoftDelete:Boolean;
}