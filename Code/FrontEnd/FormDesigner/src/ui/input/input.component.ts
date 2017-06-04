/**
 * Input Component
 */

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'fd-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  @Input() placeholderText:String;
  @Input() value:String;

  constructor() { }

  ngOnInit() {
    console.log(this.placeholderText);
    console.log(this.value);
  }

}
