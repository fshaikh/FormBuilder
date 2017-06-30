/**
 * Form Preview Component
 */

import { Component, OnInit } from '@angular/core';
import { FormsService } from "shared/services/forms/forms.service";
import { Form } from "shared/models/Form";

@Component({
  templateUrl: './form-preview.component.html',
  styleUrls: ['./form-preview.component.scss']
})
export class FormPreviewComponent implements OnInit {
  _form:Form;

  constructor(private _formService:FormsService) {
      // Do nothing
   }

  ngOnInit() {
    // get the form meta from the forms service
    this._form = this._formService.getFormState("0");
  }

}
