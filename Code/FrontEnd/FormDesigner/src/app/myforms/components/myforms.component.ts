/**
 * Component for My Forms
 */

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Form } from "shared/models/Form";
import { DialogService } from "ui/dialog/dialog.service";
import { FormTitleComponent } from "app/myforms/components/formtitle/formtitle.component";
import { DialogResult } from "ui/dialog/DialogResult";

@Component({
  templateUrl: './myforms.component.html',
  styleUrls: ['./myforms.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class MyFormsComponent implements OnInit {
  /**
   * List of forms
   */
  private forms:Form[];
  public hasForms:boolean;

  constructor(private _route:ActivatedRoute,private _router:Router,private _dialogService:DialogService) { }

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

}
