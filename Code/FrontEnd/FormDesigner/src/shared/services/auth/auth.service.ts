/**
 * Authentication related service. Provides functionality for:
 *  login
 *  logoff
 *  register
 *  verifying if user is authenticated
 */

import { Injectable } from '@angular/core';
import { Http,Response } from "@angular/http";
import { ServiceBase } from "shared/services/ServiceBase";
import { UserAuthInfo } from "shared/models/auth/UserAuthInfo";
import { Observable } from "rxjs/Observable";
import { ResponseBase } from "shared/models/ResponseBase";
import { User } from "shared/models/auth/User";
import { AuthStateService } from "shared/services/auth/auth-state-service";


@Injectable()
export class AuthService extends ServiceBase {
   private _loginUrl = '/auth/login';
  /**
    * Initializes a new instance of FormsService
    */
  constructor(http:Http,private authStateService:AuthStateService) {
    super(http,authStateService);
   }

   /**
    * Performs login for a user
    * @param authInfo - Auth info object containing username and password
    */
   doLogin(authInfo:UserAuthInfo):Observable<ResponseBase>{
     let url = this._baseUrl + this._loginUrl;
     return this.post(url,authInfo)
                          .map((response:Response) => {return this._handleLoginResponse(response)});
   }

   _handleLoginResponse(response:Response):ResponseBase{
     var responseBase:ResponseBase = <ResponseBase>this.mapPostResponse(response);
     var jsonData:any = responseBase.data;
     console.log(responseBase);
     this.authStateService.setCurrentUser(jsonData);

     return responseBase;
   }
}
