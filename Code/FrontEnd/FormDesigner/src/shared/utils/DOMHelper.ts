export class DOMHelper{
    static getParentAttribute(event:any,attributeName:string):string{
        let target = event.currentTarget;
        if(!target){
            return null;
        }
        let attr = target.attributes[attributeName];
        if(!attr){
            return null;
        }
        return attr.value;
    }

    static getAttribute(target:any,attributeName:string):string{
        let attr = target.attributes[attributeName];
        if(!attr){
            return null;
        }
        return attr.value;
    }

    
}