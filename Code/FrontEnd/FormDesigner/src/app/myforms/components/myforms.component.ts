/**
 * Component for My Forms
 */

import { Component, OnInit, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Form } from "shared/models/Form";
import { DialogService } from "ui/dialog/dialog.service";
import { FormTitleComponent } from "app/myforms/components/formtitle/formtitle.component";
import { DialogResult } from "ui/dialog/DialogResult";
import { FormEventArgs } from "app/myforms/Models/FormEventArgs";
import { ActionType } from "app/myforms/Models/ActionType";
import { FormsService } from "shared/services/forms/forms.service";
import { DeleteFormRequest } from "shared/models/FormRequest";
import { ResponseBase } from "shared/models/ResponseBase";

@Component({
  templateUrl: './myforms.component.html',
  styleUrls: ['./myforms.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class MyFormsComponent implements OnInit {
  /**
   * List of forms
   */
  forms:Form[];

  constructor(private _route:ActivatedRoute,
              private _router:Router,
              private _dialogService:DialogService,
              private _formService:FormsService,
              private _changeDetectorRef:ChangeDetectorRef) { }

  ngOnInit() {
    this._route.data.subscribe(
        data => { this._handleForms(data);}
          
    );
    this.forms = this._route.snapshot.data['myforms'];
   
  }

  hasForms():Boolean{
    if(this.forms.length === 0){
      return false;
    }
    // Look for all forms with mark for deletion
    return this.forms.filter((form:Form) => form.markForDeletion === false).length > 0;
  }
  private _handleForms(data){
    this.forms = data['myforms'];
  }

  /**
   * Returns the string for Create Form button
   */
  getText():string{
    // TODO: i18n
    return "Create Form";
  }

  /**
   * Event handler for create form
   * @param e
   */
  onCreateForm(e:any){
    // Show a popup dialog asking for the form name to be entered
    this._dialogService.open(FormTitleComponent).subscribe(
        (response:DialogResult) => this._navigate(response)
    );
  }

  getStyles():String{
    return "createform-btn";
  }

  /**
   * Navigates to Form Designer
   * @param response DialogResult
   */
  private _navigate(response:DialogResult):void{
    if(!response || !response.ActionResult){
      return;
    }

    // navigate to Form Designer
    this._router.navigate([`/design/edit/0/${response.Data.Title}`]);
  }

  handleAction(eventArgs:FormEventArgs):void{
    switch(eventArgs.actionType){
      case ActionType.Edit:
        // navigate to Form Designer
        this._router.navigate([`/design/edit/${eventArgs.form.id}/${eventArgs.form.name}`]);
        break;
      case ActionType.Delete:
        this._handleDeleteAction(eventArgs);
        break;
    }
    
  }

  _handleDeleteAction(eventArgs:FormEventArgs):void{
    // call Form Service to handle the operation
        let formRequest:DeleteFormRequest = new DeleteFormRequest();
        formRequest.FormId = eventArgs.form.id;
        formRequest.IsSoftDelete = true;
        this._formService.deleteForm(formRequest).subscribe(
          (response:ResponseBase) => this._handlePostDeleteAction(response,eventArgs)
        );
  }

  _handlePostDeleteAction(response:ResponseBase,eventArgs:FormEventArgs):void{
    if(!response.isSuccess){
      alert('Oops. Something went wrong');
      return;
    }

   
    let formId:string = eventArgs.form.id;
    // // update the forms collection. Should update the ui as well
    this.forms.find((form:Form) => form.id === formId).markForDeletion = true;

    // copy to a new array using spread operator
    let modifiedForms:Form[] = [... this.forms];
    this.forms = modifiedForms;

  }

}
