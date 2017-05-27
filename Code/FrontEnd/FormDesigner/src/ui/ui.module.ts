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

// UI components
import {ButtonComponent} from 'ui/button/button.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  declarations: [
    ButtonComponent
  ],
  exports:[
    ButtonComponent
  ]
})
export class UiModule { }
