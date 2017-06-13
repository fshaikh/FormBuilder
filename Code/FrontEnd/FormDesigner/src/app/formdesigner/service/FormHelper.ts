export default class FormHelper{
    public static getFormControlState(value:any,disabled:boolean):any{
        // You can't use the value key without the disabled key; both are required to use this way of initialization.
        return {
            value:value,
            disabled:disabled
        };
    }
}