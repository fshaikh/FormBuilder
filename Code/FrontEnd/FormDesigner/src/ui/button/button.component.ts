/**
 * Button component
 */

import { Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { UIComponentBase } from "ui/UIComponentBase";

@Component({
  selector: 'fd-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  //encapsulation: ViewEncapsulation.None
})
export class ButtonComponent extends UIComponentBase implements OnInit {
  @Input() text:String;
  
  @Output() notifyClick: EventEmitter<string> = new EventEmitter<string>();

  constructor() { super(); }

  ngOnInit(): void {
      super.ngOnInit();
    }

  /**
   * Event handler for button click event
   * @param e - Event being raised
   */
  onClick(e:any){
    this.notifyClick.emit('');
  }

  getStyles():String[]{
    let styles:String[] = [];
    styles.push(this.styles);
    styles.push("mat-raised-button");

    return styles;
  }

}
