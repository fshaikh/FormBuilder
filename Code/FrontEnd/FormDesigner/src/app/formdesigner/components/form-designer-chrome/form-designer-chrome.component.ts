import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { Form } from "shared/models/Form";
import { FieldBase } from "shared/models/FieldBase";
import { FormsService } from "shared/services/forms/forms.service";
import { FormDesignerStateService } from "app/formdesigner/service/form-designer-state.service";
import { FormRequest } from "shared/models/FormRequest";
import { ResponseBase } from "shared/models/ResponseBase";
import { Row } from "shared/models/Row";
import { RowAddedEventArgs } from "shared/models/RowAddedEventArgs";
import { FieldControlAddEventArgs } from "shared/models/FieldControlAddEventArgs";
import { RowAction } from "shared/models/RowAction";
import { NotificationBarService } from "ui/notification-bar/notification-bar.service";
import { TextNotificationMessage } from "ui/notification-bar/NotificationMessage";


@Component({
  selector: 'fd-form-designer-chrome',
  templateUrl: './form-designer-chrome.component.html',
  styleUrls: ['./form-designer-chrome.component.scss'],
  encapsulation:ViewEncapsulation.Emulated
})
export class FormDesignerChromeComponent implements OnInit {
  //private _form:Form;
  private _controls:FieldBase[] = [];

  constructor(private _route:ActivatedRoute,private _router:Router,
              private _formsService:FormsService,private _formsDesignerStateService:FormDesignerStateService,
              private _notificationService:NotificationBarService) {
      // Do nothing
   }

  ngOnInit() {
    let form = this._route.snapshot.data['design'];
    this._formsDesignerStateService._form = form;
    this._renderFormMeta(form);

    // Get the controls from the forms service
    this._controls = this._formsService.getControls();
  }

  /**
   * Event handler for navigating to my forms
   */
  navigateToMyForms(e:any):void{
    this._router.navigate(['/myforms']);
  }

  _getForm():Form{
    return this._formsDesignerStateService._form;
  }

  /**
   * Event handler for form save
   */
  onFormSave(e:any):void{
    // get the meta from the form designer state service
    let formMeta:any = this._formsDesignerStateService.getFormMeta(true);
   let formRequest:FormRequest = new FormRequest();
   formRequest.Form = formMeta;//this._form;
   formRequest.FormId = this._getForm().id;
   this._formsService.saveFormMeta(formRequest).subscribe(
            (response:ResponseBase) => {this._handleFormSaveResponse(response);}  
        );
}

/**
 * Event handler for Form Preview
 * @param e 
 */
 onFormPreview(e:any):void{
    this._formsDesignerStateService.saveFormState(this._getForm().name);
    // navigate to Form Preview
    this._router.navigate([`/preview/0`]);
 }

  _handleFormSaveResponse(response:ResponseBase){
        this._formsDesignerStateService._form = response.data;
        // show notification to user
        let message:TextNotificationMessage = new TextNotificationMessage();
        message.Message = "Form saved successfully";
        message.Action = "Dismiss";
        message.Duration = 3000;
        this._notificationService.showTextNotificationUI(message);
    }


    private _renderFormMeta(form:Form):void{
        if(form.id === "0"){
          return;
        }
        let rows:Row[] = form.tabs[0].rows;
        for(let row of rows){
            let rowAddEventArgs:RowAddedEventArgs = new RowAddedEventArgs();
            let rowId = row.id;
            rowAddEventArgs.Id = rowId;

            // add the row
            this._formsDesignerStateService.addRow(rowAddEventArgs,true);

            // add the fields
            let fields:FieldBase[] = row.fields;
            for(let field of fields){
                let fieldControlAddEventArgs:FieldControlAddEventArgs = new FieldControlAddEventArgs();
                fieldControlAddEventArgs.rowId = rowId;
                fieldControlAddEventArgs.rowAction = RowAction.Added;
                fieldControlAddEventArgs.field = field;
                fieldControlAddEventArgs.ignoreOp = false;

                this._formsDesignerStateService.addField(fieldControlAddEventArgs,true);
            }
            
        }
    }

}
