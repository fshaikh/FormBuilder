import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { FormDesignerRouteResolver } from "app/formdesigner/formdesigner-route.resolver";
import { FormDesignerChromeComponent } from "app/formdesigner/components/form-designer-chrome/form-designer-chrome.component";

// Routes table. Always define specific routes first
const routes: Routes = [
  {  path: 'design/edit/:id/:name',resolve:{design:FormDesignerRouteResolver},component:FormDesignerChromeComponent  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    FormDesignerChromeComponent
  ],
  providers:[
    FormDesignerRouteResolver
  ]
})
export class FormDesignerModule { }
