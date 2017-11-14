import { Component, OnInit } from '@angular/core';
import { AuthService } from "shared/services/auth/auth.service";
import { UserAuthInfo } from "shared/models/auth/UserAuthInfo";
import { ResponseBase } from "shared/models/ResponseBase";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators,FormBuilder } from "@angular/forms";
import { RouteableComponent } from 'ui/animations/RouteableComponent';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations:[
    RouteableComponent.getAnimation()
  ]
})
export class LoginComponent extends RouteableComponent implements OnInit {
  // Root form group
  public _loginFormGroup:FormGroup;
  
  /**
   * Initializes a new instance of LoginComponent
   * @param authService - AuthService
   * @param _router      - Router to navigate to routes from login ui
   * @param _formBuilder - FormBuilder to build reactive form
   */
  constructor(private authService:AuthService,
              private _router:Router,
              private _formBuilder:FormBuilder) {
    super();
   }

  ngOnInit() {
    // Construct the form group using FormBuilder
    this._loginFormGroup = this._formBuilder.group({
      userName:['',[Validators.required]],
      password:['',[Validators.required]]
    });
  }

  /**
   * Event handler for Login click
   */
  onLogin():void{
    var userAuthInfo = new UserAuthInfo();
    var value = this._loginFormGroup.value;
    userAuthInfo.userName = value.userName;
    userAuthInfo.password = value.password;

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
