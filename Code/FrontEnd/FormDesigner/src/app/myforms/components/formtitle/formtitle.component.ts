/**
 * Component for capturing Form Title
 */
import { Component, ViewChild } from '@angular/core';
import { DialogService } from "ui/dialog/dialog.service";
import { DialogResult } from "ui/dialog/DialogResult";

@Component({
  selector: 'fd-formtitle',
  templateUrl: './formtitle.component.html',
  styleUrls: ['./formtitle.component.scss']
})
export class FormTitleComponent{
  public dialogService:DialogService;
  title:string;
  @ViewChild('titleInput') titleInput;


  /**
   * Initializes a new instance of FormTitleComponent
   */
  constructor() {
      // Do nothing
   }

  /**
   * Closes the Form Title Component
   * @param result Boolean representing whether user has confirmed an action or declined
   */
  onClose(result:Boolean):void{
     let dialogResult:DialogResult = new DialogResult();
     dialogResult.ActionResult = result;
     dialogResult.Data = {Title:this.titleInput.value};

     this.dialogService.close(dialogResult);
  }

  isEnabled():Boolean{
    if(!this.titleInput){
      return false;
    }
  }

  getTitlePlaceholder():String{
    return "Title Me";
  }

  getValue():String{
    return "";
  }

  getOkButtonText():String{
    return "Continue";
  }

  getCancelButtonText():String{
    return "Cancel";
  }

  getStyles(type:Boolean):String{
    return type? "ok-btn":"cancel-btn";
  }

}
