import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { Form } from "shared/models/Form";
import { FieldBase } from "shared/models/FieldBase";
import { FormsService } from "shared/services/forms/forms.service";
import { FormDesignerStateService } from "app/formdesigner/service/form-designer-state.service";
import { FormRequest } from "shared/models/FormRequest";
import { ResponseBase } from "shared/models/ResponseBase";


@Component({
  selector: 'fd-form-designer-chrome',
  templateUrl: './form-designer-chrome.component.html',
  styleUrls: ['./form-designer-chrome.component.scss'],
  encapsulation:ViewEncapsulation.Emulated
})
export class FormDesignerChromeComponent implements OnInit {
  private _form:Form;
  private _controls:FieldBase[] = [];

  constructor(private _route:ActivatedRoute,private _router:Router,private _formsService:FormsService,private _formsDesignerStateService:FormDesignerStateService) {
      // Do nothing
   }

  ngOnInit() {
    this._form = this._route.snapshot.data['design'];

    // Get the controls from the forms service
        this._controls = this._formsService.getControls();
  }

  /**
   * Event handler for navigating to my forms
   */
  navigateToMyForms(e:any):void{
    this._router.navigate(['/myforms']);
  }

  /**
   * Event handler for form save
   */
  onFormSave(e:any):void{
    // get the meta from the form designer state service
   let formMeta:any = this._formsDesignerStateService.getFormMeta(true,this._form.name);
   console.log(formMeta);
   
   let formRequest:FormRequest = new FormRequest();
   formRequest.Form = formMeta;
   this._formsService.saveFormMeta(formRequest).subscribe(
            (response:ResponseBase) => {this._handleFormSaveResponse(response);}  
        );
}

/**
 * Event handler for Form Preview
 * @param e 
 */
 onFormPreview(e:any):void{
    this._formsDesignerStateService.saveFormState(this._form.name);
    // navigate to Form Preview
    this._router.navigate([`/preview/0`]);
 }

  _handleFormSaveResponse(response:ResponseBase){
        alert(response.message);
    }

}
