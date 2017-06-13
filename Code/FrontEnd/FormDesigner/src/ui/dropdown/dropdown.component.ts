import { Component, OnInit, Input } from '@angular/core';
import { UIComponentBase } from "ui/UIComponentBase";
import { KeyValuePair } from "shared/Models/KeyValuePair";

@Component({
  selector: 'fd-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent extends UIComponentBase implements OnInit {
  @Input() placeholderText:String;
  @Input() selectPairs:KeyValuePair[] = [];
  
  constructor() { super(); }

  ngOnInit() {
    super.ngOnInit();
  }

}
