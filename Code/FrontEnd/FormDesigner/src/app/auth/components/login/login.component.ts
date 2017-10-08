import { Component, OnInit } from '@angular/core';
import { AuthService } from "shared/services/auth/auth.service";
import { UserAuthInfo } from "shared/models/auth/UserAuthInfo";
import { ResponseBase } from "shared/models/ResponseBase";
import { Router } from "@angular/router";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: 'fd-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private _loginFormGroup:FormGroup;
  private userName:FormControl = new FormControl();
  private password:FormControl = new FormControl();
  
  constructor(private authService:AuthService,private _router:Router) { }

  ngOnInit() {
    this._loginFormGroup = new FormGroup({
      userName:this.userName,
      password:this.password
    });
  }

  /**
   * Event handler for Login click
   */
  onLogin():void{
    var userAuthInfo = new UserAuthInfo();
    userAuthInfo.userName = this.userName.value;
    userAuthInfo.password = this.password.value;

    this.authService.doLogin(userAuthInfo).subscribe(
      (value:ResponseBase) => {this._router.navigate(['/myforms'])},
      (error:any) => console.error(error)
    );
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

  getLoginButtonText():String{
    return "Login";
  }

  getPasswordType():String{
    return "password";
  }

  getStyles(type:Boolean):String{
    return "ok-btn";
  }

  

}
