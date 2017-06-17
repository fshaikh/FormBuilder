/**
 * Long text component
 */

import { Component, OnInit, Input } from '@angular/core';
import { UIComponentBase } from "ui/UIComponentBase";

@Component({
  selector: 'fd-long-text',
  templateUrl: './long-text.component.html',
  styleUrls: ['./long-text.component.scss']
})
export class LongTextComponent extends UIComponentBase implements OnInit {
  
  /**
   * Placeholder Text
   */
  @Input() placeholderText:String;
  /**
   * Value to be shown in the input control
   */
  @Input() value:String;
  
  constructor() { super(); }

  ngOnInit(): void {
      super.ngOnInit();
    }

  getStyles():String[]{
    let styles:String[] = [];
    styles.push(this.styles);
    styles.push("mat-input-element");

    return styles;
  }

}
