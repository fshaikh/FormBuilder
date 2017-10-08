/**
 * Module for Auth UI(Login,Logoff, Register, Settings)
 */

import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

// Feature Modules
import { UiModule } from "ui/ui.module";

// Components
import { LoginComponent } from "app/auth/components/login/login.component";


// Routes table. Always define specific routes first
const routes: Routes = [
  {  path: 'login',component:LoginComponent  }
];

@NgModule({
    imports:[
        RouterModule.forChild(routes),
        UiModule,
        ReactiveFormsModule
    ],
    declarations: [
        LoginComponent
    ]
})
export class AuthModule{

}