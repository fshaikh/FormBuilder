/**
 * Authentication related service. Provides functionality for:
 *  login
 *  logoff
 *  Signup
 *  verifying if user is authenticated
 */

import { Injectable } from '@angular/core';
import { Http,Response } from "@angular/http";
import { ServiceBase } from "shared/services/ServiceBase";
import { UserAuthInfo , ExtendedUserAuthInfo} from "shared/models/auth/UserAuthInfo";
import { Observable } from "rxjs/Observable";
import { ResponseBase } from "shared/models/ResponseBase";
import { User } from "shared/models/auth/User";
import { AuthStateService } from "shared/services/auth/auth-state-service";
import {UserExistsRequest} from 'shared/models/auth/UserExistsRequest';
import { UserExistsResponse } from 'shared/models/auth/UserExistsResponse';


@Injectable()
export class AuthService extends ServiceBase {
   private _loginUrl = '/auth/login';
   private _signupUrl = '/auth/register';
   private _userExistsUrl = '/auth/user/';
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
   public doLogin(authInfo:UserAuthInfo):Observable<ResponseBase>{
     let url = this._baseUrl + this._loginUrl;
     return this.post(url,authInfo)
                          .map((response:Response) => {return this._handleLoginResponse(response)});
   }

   /**
    * Performs signup for a new user
    */
   public doRegister(authInfo:ExtendedUserAuthInfo):Observable<ResponseBase>{
      let url = this._baseUrl + this._signupUrl;
      return this.post(url,authInfo)
                  .map((response:Response) => {return this._handleSignupResponse(response)});
   }

   /**
    * Performs log off for the authenticated user
    */
   public doLogOff():void{
    // if the user is already logged out, dont do anything
    if(!this._authStateService.isAuthenticated){
      return;
    }
    // clear the user auth state
    this._authStateService.clearAuth();

    // TODO: send log off signal to server. Will be required when using External
    // Auth Provider to log off the user from the external provider
  }

  /**
   * 
   */
  public isUserExists(request:UserExistsRequest):Observable<UserExistsResponse>{
    let url = this._baseUrl + this._userExistsUrl +  request.Type + '/' + request.Value;
    return this.get(url)
               .map((response:Response) => this._handleUserExistsResponse(response));

  }

  public getCurrentUser():User{
    return this._authStateService.getCurrentUser();
  }

  public isAuthenticated():boolean{
    return this._authStateService.isAuthenticated();
  }

   _handleLoginResponse(response:Response):ResponseBase{
     var responseBase:ResponseBase = <ResponseBase>this.mapPostResponse(response);
     var jsonData:any = responseBase.data;
     this.authStateService.setCurrentUser(jsonData);

     return responseBase;
   }

    /**
     * Handles the server response for a signup request
     */
   _handleSignupResponse(response:Response):ResponseBase{
      return <ResponseBase>this.mapPostResponse(response);
   }

   _handleUserExistsResponse(response:Response):UserExistsResponse{
      var responseBase = <ResponseBase>this.mapPostResponse(response);
      var userExistsResponse = new UserExistsResponse();
      userExistsResponse.Exists = responseBase.data.exists;

      return userExistsResponse;
   }

   private handleError(error:Response):any{
        console.log(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
