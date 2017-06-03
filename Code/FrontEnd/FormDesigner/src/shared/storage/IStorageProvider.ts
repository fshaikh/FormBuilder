/**
 * Interface for storage provider
 */
import { KeyValuePair } from "../Models/KeyValuePair";

export interface IStorageProvider {
    save(kv:KeyValuePair):void;
    get(key:string):KeyValuePair;
    remove(key:string):void;
}