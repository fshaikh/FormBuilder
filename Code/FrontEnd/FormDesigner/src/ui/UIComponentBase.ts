/**
 * Base class for all UI components
 */
import { Input } from "@angular/core";

export abstract class UIComponentBase {
    /**
   * Form Control name wen using this input component in a reactive forms way
   */
  @Input() controlName:String;
  /**
   * Form Group name wen using this input component in a reactive forms way
   */
  @Input() controlGroup:String;

  /**
   * Styles to be applied to the ui component
   */
  @Input() styles:String;
  
  protected _usesReactive:Boolean = false;

  protected ngOnInit(){
      if(this.controlName && this.controlGroup){
        this._usesReactive = true;
      }
  }
}