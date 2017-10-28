import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import {FormsModule,ReactiveFormsModule} from "@angular/forms";
 import {MatTabsModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// Feature Modules
import { UiModule } from "ui/ui.module";


import { FormDesignerRouteResolver } from "app/formdesigner/formdesigner-route.resolver";
import { FormDesignerChromeComponent } from "app/formdesigner/components/form-designer-chrome/form-designer-chrome.component";
import { FormControlPanelComponent } from "app/formdesigner/components/form-control-panel/form-control-panel.component";
import { FormCanvasComponent } from "app/formdesigner/components/form-canvas/form-canvas.component";
import { FormRowComponent } from "app/formdesigner/components/form-row/form-row.component";
import { FormDesignerStateService } from "app/formdesigner/service/form-designer-state.service";
import { FormFieldControlComponent } from "app/formdesigner/components/form-field-control/form-field-control.component";
import { LongTextPropertyComponent } from "app/formdesigner/components/controls-properties/LongText/form-field-longtext-property.component";
import { ShortTextPropertyComponent } from "app/formdesigner/components/controls-properties/ShortText/form-field-shorttext-property.component";
import { DropDownPropertyComponent } from "app/formdesigner/components/controls-properties/DropDown/form-field-dropdown-property.component";
import { CommonPropertyComponent } from "app/formdesigner/components/controls-properties/form-field-common-property.component";
import { FormFieldPropertyComponent } from "app/formdesigner/components/form-field-property/form-field-property.component";
import { FormPreviewComponent } from "app/formdesigner/components/form-preview/form-preview.component";
import { FormRendererModule } from "formrenderer/form-renderer.module";

// Routes table. Always define specific routes first
const routes: Routes = [
  {  path: 'design/edit/:id/:name',resolve:{design:FormDesignerRouteResolver},component:FormDesignerChromeComponent  },
  {  path: 'preview/:id',component: FormPreviewComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    UiModule,
    //MdTabsModule,
    MatTabsModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormRendererModule
  ],
  declarations: [
    FormDesignerChromeComponent,
    FormControlPanelComponent,
    FormCanvasComponent,
    FormRowComponent,
    FormFieldControlComponent,
    LongTextPropertyComponent,
    ShortTextPropertyComponent,
    DropDownPropertyComponent,
    CommonPropertyComponent,
    FormFieldPropertyComponent,
    FormPreviewComponent
  ],
  entryComponents:[
        FormRowComponent,
        FormFieldControlComponent,
        LongTextPropertyComponent,
        ShortTextPropertyComponent,
        DropDownPropertyComponent,
        CommonPropertyComponent,
    ],
  providers:[
    FormDesignerRouteResolver,
    FormDesignerStateService
  ]
})
export class FormDesignerModule { }
