/**
 * Progress Indicator Component
 */

import { Component, OnInit } from '@angular/core';
import { UIComponentBase } from "ui/UIComponentBase";

@Component({
  selector: 'fd-progress-indicator',
  templateUrl: './progress-indicator.component.html',
  styleUrls: ['./progress-indicator.component.scss']
})
export class ProgressIndicatorComponent extends UIComponentBase implements OnInit {

  constructor() { super(); }

  ngOnInit(): void {
      
    }

}
