// Angular Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import {FormsModule,ReactiveFormsModule} from "@angular/forms";

// Components
import { FormRendererCoreComponent } from "formrenderer/components/form-renderer-core/form-renderer-core.component";
import { FormRendererRouteResolver } from "formrenderer/formrenderer-route-resolver";
import { FieldControlComponent } from "formrenderer/components/field-control/field-control.component";
import { ShortTextUIFieldComponent } from "formrenderer/controls/shorttext/shorttext-field.component";
import { LongTextUIFieldComponent } from "formrenderer/controls/longtext/longtext-field.component";
import { CheckboxUIFieldComponent } from "formrenderer/controls/checkbox/checkbox-field.component";
import { DropdownUIFieldComponent } from "formrenderer/controls/dropdown/dropdown-field.component";
import { RadiobuttonUIFieldComponent } from "formrenderer/controls/radiobutton/radiobutton-field.component";
import { DateUIFieldComponent } from "formrenderer/controls/date/date-field.component";
import { UiModule } from "ui/ui.module";

// Routes table. Always define specific routes first
const routes: Routes = [
  {  path: 'render/:id',resolve:{design:FormRendererRouteResolver},component:FormRendererCoreComponent  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UiModule
  ],
  declarations: [
    FormRendererCoreComponent,
    FieldControlComponent,
      ShortTextUIFieldComponent,
        LongTextUIFieldComponent,
        CheckboxUIFieldComponent,
        DropdownUIFieldComponent,
        RadiobuttonUIFieldComponent,
        DateUIFieldComponent
  ],
  exports:[
    FormRendererCoreComponent
  ],
  entryComponents:[
     ShortTextUIFieldComponent,
        LongTextUIFieldComponent,
        CheckboxUIFieldComponent,
        DropdownUIFieldComponent,
        RadiobuttonUIFieldComponent,
        DateUIFieldComponent
  ]
})
export class FormRendererModule { }
