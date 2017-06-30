/**
 * Component for Radio button
 */

import { Component, OnInit, Input } from '@angular/core';
import { UIComponentBase } from "ui/UIComponentBase";
import { KeyValuePair } from "shared/models/KeyValuePair";

@Component({
  selector: 'fd-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss']
})
export class RadioButtonComponent extends UIComponentBase implements OnInit {
   @Input() selectPairs:KeyValuePair[] = [];
   
  constructor() { super(); }

  ngOnInit() {
    super.ngOnInit();
  }

}
