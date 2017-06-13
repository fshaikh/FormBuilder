/**
 * Checkbox component
 */

import { Component, OnInit, Input } from '@angular/core';
import { UIComponentBase } from "ui/UIComponentBase";

@Component({
  selector: 'fd-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent extends UIComponentBase implements OnInit {
  @Input() text:String;
  @Input() checked:Boolean = false;
  @Input() useToggle:Boolean = false;

  constructor() {
    super();
   }

  ngOnInit() {
    super.ngOnInit();
  }

}
