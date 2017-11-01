import { Component, OnInit } from '@angular/core';
import { AuthService } from "shared/services/auth/auth.service";
import { UserAuthInfo,ExtendedUserAuthInfo } from "shared/models/auth/UserAuthInfo";
import { ResponseBase } from "shared/models/ResponseBase";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { RouteableComponent } from 'ui/animations/RouteableComponent';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public _signupFormGroup:FormGroup;
  userName:FormControl = new FormControl();
  password:FormControl = new FormControl();
  email:FormControl = new FormControl();

  /**
   * Initalizes a new instance of RegisterComponent
   */
  constructor(private _authService:AuthService,private _router:Router) {
      
   }

  ngOnInit() {
    this._signupFormGroup = new FormGroup({
      userName:this.userName,
      password: this.password,
      email: this.email
    });

    this.userName.setValidators(Validators.required);
    this.password.setValidators(Validators.required);
    this.email.setValidators(Validators.required);
  }

  /**
   * Event handler for register request
   */
  onRegister():void{
    var authInfo = new ExtendedUserAuthInfo();
    authInfo.userName = this.userName.value;
    authInfo.password = this.password.value;
    authInfo.email = this.email.value;

    this._authService.doRegister(authInfo).subscribe(
      (response:ResponseBase) => {this._router.navigate['/login']},
      (error:any) => this.handleSignupError(error)
    );
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

}
