/**
 * Form List Item component
 */
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Form } from "shared/models/Form";
import { DOMHelper } from "shared/utils/DOMHelper";
import { FormEventArgs } from "app/myforms/Models/FormEventArgs";
import { ActionType } from "app/myforms/Models/ActionType";


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
  constructor() { }

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
        
      }
  }

  /**
   * Event handler for delete form action
   * @param e Event object
   */
  onFormDelete(e:any):void{
    alert('form delete');
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
}
