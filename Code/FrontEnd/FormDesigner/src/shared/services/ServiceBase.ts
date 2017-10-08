/**
 * Base class for all services
 */

import { Http, RequestOptionsArgs ,Headers,Response} from "@angular/http";
import { Observable } from "rxjs/Observable";
import { environment } from '../../environments/environment';
import { ResponseBase } from "shared/models/ResponseBase";
import { Inject } from "@angular/core";
import { AuthStateService } from "shared/services/auth/auth-state-service";

export abstract class ServiceBase {
    protected _baseUrl:string = environment.serverUrl;

    constructor(protected _http:Http,protected _authStateService: AuthStateService ){
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

        // Set the token header if current user is using token-based auth
        var currentUser = this._authStateService.getCurrentUser();
        if(currentUser != null){
            headers.set('x-auth-token',JSON.stringify(currentUser));
        }

        return headers;
    } 

    protected mapPostResponse(response:Response):ResponseBase{
        let json:any = response.json();
        let responseBase = new ResponseBase();
        responseBase.isSuccess = json.isSuccess;
        responseBase.message = json.message;
        responseBase.data = json.data;

        return responseBase;
    }

    
}