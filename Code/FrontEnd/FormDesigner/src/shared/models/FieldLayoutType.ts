

import { KeyValuePair } from "shared/Models/KeyValuePair";

export class FieldLayoutType {
    static getFieldLayouts():KeyValuePair[]{
        let pairs:KeyValuePair[] = [];
        pairs.push(FieldLayoutType.getKeyValuePair(1,"Left"));
        pairs.push(FieldLayoutType.getKeyValuePair(2,"Right"));
        pairs.push(FieldLayoutType.getKeyValuePair(3,"Span"));
        pairs.push(FieldLayoutType.getKeyValuePair(4,"Both"));

        return pairs;
    }

    static getKeyValuePair(key:any,value:any){
        let kvPair:KeyValuePair = new KeyValuePair();
        kvPair.key = key;
        kvPair.value = value;

        return kvPair;
    }
}