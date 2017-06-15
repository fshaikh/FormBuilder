/**
 * Input Component
 */

import { Component, OnInit, Input } from '@angular/core';
import { UIComponentBase } from "ui/UIComponentBase";

@Component({
  selector: 'fd-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent extends UIComponentBase implements OnInit {
  /**
   * Placeholder Text
   */
  @Input() placeholderText:String;
  /**
   * Value to be shown in the input control
   */
  @Input() value:String;

  /**
   * Type of input:
   */
  @Input() type:String = "text";
  

  constructor() {
    super();
    
   }

  ngOnInit(): void {
      super.ngOnInit();
    }


}
