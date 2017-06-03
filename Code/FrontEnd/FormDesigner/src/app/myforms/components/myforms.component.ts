/**
 * Component for My Forms
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Form } from "shared/models/Form";

@Component({
  templateUrl: './myforms.component.html',
  styleUrls: ['./myforms.component.scss']
})
export class MyFormsComponent implements OnInit {
  /**
   * List of forms
   */
  private forms:Form[];
  public hasForms:boolean;

  constructor(private _route:ActivatedRoute) { }

  ngOnInit() {
    this._route.data.subscribe(
        data => { this._handleForms(data);}
          
    );
    this.forms = this._route.snapshot.data['myforms'];
    this.hasForms = this.forms.length === 0 ? false:true;
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
  }

}
