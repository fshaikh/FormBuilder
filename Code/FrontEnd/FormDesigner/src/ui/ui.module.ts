import { NgModule } from '@angular/core';
/**
 * UI Module which provides wrappers for underlying UI elements.
 * This allows swapping the UI framework without impacting the entire application. Import the underlying UX Library into this module
 * @preferred
 */

import { CommonModule } from '@angular/common';

// Angular Material modules
import {MaterialModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from "@angular/forms";

// UI components
import { ButtonComponent } from 'ui/button/button.component';
import { DialogService } from "ui/dialog/dialog.service";
import { InputComponent } from "ui/input/input.component";


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  declarations: [
    ButtonComponent,
    InputComponent
  ],
  providers:[
    DialogService
  ],
  exports:[
    ButtonComponent,
    InputComponent
  ]
})
export class UiModule { }
