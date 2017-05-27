export class DOMHelper{
    static getParentAttribute(event:any,attributeName:string):string{
        let target = event.currentTarget;
        if(!target){
            return null;
        }
        return target.attributes[attributeName].value;
    }
}