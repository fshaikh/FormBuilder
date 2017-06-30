/**
 * Base class for all services
 */

import { Http, RequestOptionsArgs ,Headers} from "@angular/http";
import { Observable } from "rxjs/Observable";
import { environment } from '../../environments/environment';



export abstract class ServiceBase {
    protected _baseUrl:string = environment.serverUrl;

    constructor(protected _http:Http){
        // Do nothing
    }

    protected get(url):Observable<any>{
        let options:RequestOptionsArgs = {
            headers:this.getStandardGetHeaders(), 
            withCredentials:true
        };
        
        return this._http.get(url,options);
    }

    protected post(url,payload):Observable<any>{
         let options:RequestOptionsArgs = {
            headers:this.getStandardGetHeaders(), 
            withCredentials:true
        };
        
        return this._http.post(url,payload,options);
    }

    protected delete(url,payload):Observable<any>{
        let options:RequestOptionsArgs = {
            headers:this.getStandardGetHeaders(), 
            withCredentials:true
        };

        return this._http.delete(url,options);
    }

    protected getStandardGetHeaders():Headers{
        let headers:Headers = new Headers();
        headers.set("content-type","application/json");
        headers.set("accept","application/json");
        headers.set("Access-Control-Allow-Credentials","true");

        return headers;
    } 

    
}