/**
 * Form List Item component
 */
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Form } from "shared/models/Form";
import { DOMHelper } from "shared/utils/DOMHelper";
import { FormEventArgs } from "app/myforms/Models/FormEventArgs";
import { ActionType } from "app/myforms/Models/ActionType";
import { DialogService } from "ui/dialog/dialog.service";
import { ConfirmationDialogComponent } from "ui/dialog/confirmation-dialog/confirmation-dialog.component";
import { DialogResult } from "ui/dialog/DialogResult";
import { ConfirmationDialogRequest } from "ui/dialog/confirmation-dialog/ConfirmationDialogRequest";


@Component({
  selector: 'fd-formitem',
  templateUrl: './formlist.component.html',
  styleUrls: ['./formlist.component.scss']
})
export class FormListComponent implements OnInit {
  /**
   * Form to bind to
   */
  @Input() form:Form;

  @Output() notifyAction: EventEmitter<FormEventArgs> = new EventEmitter<FormEventArgs>();

  private FORMID_ATTR:string = "data-form-id";
  private DATAACTION_ATTR:string = "data-action";

  /**
   * Initializes a new instance of FormListComponent
   */
  constructor(private _dialogService:DialogService) { }

  ngOnInit() {
  }

  /**
   * Event handler when an item is clicked.
   * Delegates the event to appropriate handler based on the data action attribute. This way of event handling
   * reduces the number of event handlers to just one per list item
   * @param e Event
   */
  onItemClick(e:any){
      // // get the form id based on the attribute
      // let formId:string = DOMHelper.getParentAttribute(e,this.FORMID_ATTR);

      // check if any action items have been the target
      let action:string = DOMHelper.getAttribute(e.target,this.DATAACTION_ATTR);

      switch(action){
        case "edit":
          this.onFormEdit();
          break;
        case "delete":
          this.onFormDelete();
          break;
        
      }
  }

  /**
   * Event handler for delete form action
   * @param e Event object
   */
  onFormDelete():void{
    // show a confirmation dialog
    let request:ConfirmationDialogRequest = new ConfirmationDialogRequest();
    request.Title = "Delete Form";
    request.Description = "Are you sure you want to delete the form?";
    this._dialogService.openConfirmationDialog(ConfirmationDialogComponent,request).subscribe(
        (response:DialogResult) => {this._handleFormDeleteConfirmation(response);}
    );
  }

  /**
   * Event handler for editing selected form
   */
   onFormEdit():void{
      // create a formlistactionargs object
      let formEventArgs:FormEventArgs = new FormEventArgs();
      formEventArgs.form = this.form;
      formEventArgs.actionType = ActionType.Edit;


      // emit the event. (This will be handled by the parent component). This keeps the component dumb
      this.notifyAction.emit(formEventArgs);
   }

   _handleFormDeleteConfirmation(response:DialogResult):void{
     // User has selected 'No'
      if(!response.ActionResult){
        return;
      }

      // User has selected 'Yes'
      // create a formlistactionargs object
      let formEventArgs:FormEventArgs = new FormEventArgs();
      formEventArgs.form = this.form;
      formEventArgs.actionType = ActionType.Delete;


      // emit the event. (This will be handled by the parent component). This keeps the component dumb
      this.notifyAction.emit(formEventArgs);
   }
}
