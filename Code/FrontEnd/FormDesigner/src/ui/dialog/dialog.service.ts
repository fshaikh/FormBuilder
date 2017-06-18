import { Injectable } from '@angular/core';
import { MdDialog } from '@angular/material';
import { Observable } from "rxjs/Observable";
import { DialogResult } from "ui/dialog/DialogResult";
import { ConfirmationDialogRequest } from "ui/dialog/confirmation-dialog/ConfirmationDialogRequest";

@Injectable()
export class DialogService {
  private _dialogRef;

  constructor(private _mdDialog: MdDialog) {
      // Do nothing
  }

  public open(component:any,request:ConfirmationDialogRequest = null):Observable<DialogResult>{
    this._dialogRef = this._mdDialog.open(component);
    let componentInstance:any = this._dialogRef.componentInstance;
    if(request){
      componentInstance.Request = request;
    }
    componentInstance.dialogService = this;
    return this._dialogRef.afterClosed();
  }

  public openConfirmationDialog(component:any,request:ConfirmationDialogRequest):Observable<DialogResult>{
       return this.open(component,request);
  }

  public close(result:DialogResult):void{
      if(this._dialogRef){
        this._dialogRef.close(result);
      }
  }

}
