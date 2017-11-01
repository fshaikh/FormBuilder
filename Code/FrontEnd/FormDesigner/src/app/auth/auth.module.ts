/**
 * Module for Auth UI(Login,Logoff, Register, Settings)
 */

// Angular Modules
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

// Feature Modules
import { UiModule } from "ui/ui.module";

// Components
import { LoginComponent } from "app/auth/components/login/login.component";
import { RegisterComponent } from "app/auth/components/register/register.component";

// Routes table. Always define specific routes first
const routes: Routes = [
  {  path: 'login',component:LoginComponent  },
  {  path: 'signup', component:RegisterComponent}
];

@NgModule({
    imports:[
        RouterModule.forChild(routes),
        UiModule,
        ReactiveFormsModule
    ],
    declarations: [
        LoginComponent,
        RegisterComponent
    ]
})
export class AuthModule{

}