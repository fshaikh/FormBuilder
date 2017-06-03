/**
 * Local Storage Provider
 */

import { Injectable } from '@angular/core';
import { IStorageProvider } from "./IStorageProvider";
import { KeyValuePair } from "../Models/KeyValuePair";

@Injectable()
export class LocalStorageProvider implements IStorageProvider {
    save(kv: KeyValuePair): void {
            localStorage.setItem(kv.key,kv.value);
        }
    get(key: string): KeyValuePair {
        let value:string = localStorage.getItem(key);
        if(value == null){
            return null;
        }
        let kv:KeyValuePair = new KeyValuePair();
        kv.key = key;
        kv.value = value;

        return kv;
    }

    remove(key: string): void {
        localStorage.removeItem(key);
    }

}