import { UserTypeEnum } from './../../../../shared/models/auth/UserTypeEnum';
import { UserExistsRequest } from 'shared/models/auth/UserExistsRequest';
import { Component, OnInit } from '@angular/core';
import { AuthService } from "shared/services/auth/auth.service";
import { UserAuthInfo,ExtendedUserAuthInfo } from "shared/models/auth/UserAuthInfo";
import { ResponseBase } from "shared/models/ResponseBase";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { RouteableComponent } from 'ui/animations/RouteableComponent';
import { UserExistsResponse } from 'shared/models/auth/UserExistsResponse';
import { userExistsValidator } from 'app/auth/Validators/UsernameExistsValidator';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public _signupFormGroup:FormGroup;
  /**
   * Initalizes a new instance of RegisterComponent
   */
  constructor(private _authService:AuthService,private _router:Router,private _formBuilder:FormBuilder) {
      
   }

  ngOnInit() {
    var request = new UserExistsRequest();
    request.Type = UserTypeEnum.Username;
    this._signupFormGroup = this._formBuilder.group({
      userName:['',[Validators.required],[userExistsValidator(request,this._authService)]],
      password:['',[Validators.required]],
      email:['',[Validators.required]]
    });
  }

  /**
   * Event handler for register request
   */
  onRegister():void{
    var authInfo = new ExtendedUserAuthInfo();
    var value = this._signupFormGroup.value;
    authInfo.userName = value.userName;
    authInfo.password = value.password;
    authInfo.email = value.email;

    // this._authService.doRegister(authInfo).subscribe(
    //   (response:ResponseBase) => {this._router.navigate['/login']},
    //   (error:any) => this.handleSignupError(error)
    // );

   // console.log(this._signupFormGroup.valid);
    console.log(this._signupFormGroup.get('userName').valid);
  }

  private handleSignupError(error:any){
    alert('Signup Failed');
  }

  getUsernamePlaceholder():String{
    return "Enter Username here";
  }

  getUserFormControlName():String{
    return "userName";
  }

  getPasswordFormControlName():String{
    return "password";
  }

  getPasswordPlaceholder():String{
    return "Enter Password here";
  }

  getEmailPlaceholder():String{
    return "Enter Email here";
  }

  getEmailFormControlName():String{
    return "email";
  }

  getSignupButtonText():String{
    return "Sign Up";
  }

  getPasswordType():String{
    return "password";
  }

  getEmailType():String{
    return "email";
  }

  getStyles(type:Boolean):String{
    return "ok-btn";
  }

  public showUserNameExistsMessage():boolean{
    var errors = this._signupFormGroup.get('userName').errors;
    return errors == null ? false: errors.exists ? true:false;
  }

}
