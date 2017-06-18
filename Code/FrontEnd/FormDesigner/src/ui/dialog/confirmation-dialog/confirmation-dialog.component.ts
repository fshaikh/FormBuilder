/**
 * Component for Confirmation Dialog
 */
import { Component, OnInit, Input } from '@angular/core';
import { DialogResult } from "ui/dialog/DialogResult";
import { ConfirmationDialogRequest } from "ui/dialog/confirmation-dialog/ConfirmationDialogRequest";
import { DialogService } from "ui/dialog/dialog.service";

@Component({
  selector: 'fd-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {
  public Request:ConfirmationDialogRequest;
  
  constructor(private dialogService:DialogService) { }

  ngOnInit() {
  }

  /**
   * Closes the Form Title Component
   * @param result Boolean representing whether user has confirmed an action or declined
   */
  onClose(result:Boolean):void{
     let dialogResult:DialogResult = new DialogResult();
     dialogResult.ActionResult = result;

     this.dialogService.close(dialogResult);
  }

  getStyles(type:Boolean):String{
    return type? "ok-btn":"cancel-btn";
  }

}
