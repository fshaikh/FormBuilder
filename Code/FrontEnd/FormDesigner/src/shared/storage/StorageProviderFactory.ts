/**
 * Factory to create storage provider
 */

import { IStorageProvider } from "shared/storage/IStorageProvider";
import { LocalStorageProvider } from "shared/storage/LocalStorageProvider";

export class StorageProviderFactory {
    public static getStorageProvider(){
        let provider:IStorageProvider = null;

        // return local storage provider for now
        provider = new LocalStorageProvider();

        return provider;
    }
}