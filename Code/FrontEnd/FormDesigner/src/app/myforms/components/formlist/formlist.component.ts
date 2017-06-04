/**
 * Form List Item component
 */
import { Component, OnInit, Input } from '@angular/core';
import { Form } from "shared/models/Form";

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

  /**
   * Initializes a new instance of FormListComponent
   */
  constructor() { }

  ngOnInit() {
  }

  /**
   * Event handler for delete form action
   * @param e Event object
   */
  onFormDelete(e:any):void{
    alert('form delete');
  }

}
