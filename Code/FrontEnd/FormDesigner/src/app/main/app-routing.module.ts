/**
 * Application routing module. Define all root routes here.
 */

// Angular Modules
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Feature Modules
import { MyFormsModule } from "app/myforms/myforms.module";
import {AuthModule} from "app/auth/auth.module";
import { FormDesignerModule } from "app/formdesigner/form-designer.module";

// Home component
import { HomeComponent } from "app/main/home/home.component";




// Routes table. Always define specific routes first
const routes: Routes = [
  {  path: 'home',component:HomeComponent  },
  {  path:'',redirectTo:'home',pathMatch:'full'},
  {  path:'**',redirectTo:'home',pathMatch:'full'}
];

@NgModule({
  imports: [
    MyFormsModule,
    AuthModule,
    FormDesignerModule,
    RouterModule.forRoot(routes)
    ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
