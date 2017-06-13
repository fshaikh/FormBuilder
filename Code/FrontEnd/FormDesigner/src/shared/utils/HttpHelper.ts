import {Headers} from '@angular/http';

export class HttpHelper{
    static getStandardPostHeaders():Headers{
        let headers:Headers = new Headers();
        headers.set("content-type","application/json");
        headers.set("accept","application/json");

        return headers;
    } 
}