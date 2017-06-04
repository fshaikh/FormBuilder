import { Injectable } from '@angular/core';
import { MdDialog } from '@angular/material';
import { Observable } from "rxjs/Observable";
import { DialogResult } from "ui/dialog/DialogResult";

@Injectable()
export class DialogService {
  private _dialogRef;

  constructor(private _mdDialog: MdDialog) {
      // Do nothing
  }

  public open(component:any):Observable<DialogResult>{
    this._dialogRef = this._mdDialog.open(component);
    this._dialogRef.componentInstance.dialogService = this;
    return this._dialogRef.afterClosed();
  }

  public close(result:DialogResult):void{
      if(this._dialogRef){
        this._dialogRef.close(result);
      }
  }

}
