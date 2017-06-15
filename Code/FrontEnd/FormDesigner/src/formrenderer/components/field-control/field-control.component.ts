import { Component, AfterContentInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, Input } from '@angular/core';
import { FormGroup } from "@angular/forms";

import { FieldBase } from "shared/models/FieldBase";
import { FieldType } from "shared/models/FieldType";
import { FieldComponentFactory } from "formrenderer/components/FieldComponentFactory";

@Component({
  selector: 'fd-field-control',
  templateUrl: './field-control.component.html',
  styleUrls: ['./field-control.component.scss']
})
export class FieldControlComponent implements AfterContentInit {
  @Input() field:FieldBase;
    @Input() formGroup:FormGroup;
    fieldType = FieldType;
    
   // View child where the field control will be rendered. This acts as the host
    @ViewChild('fieldControl',{read:ViewContainerRef}) _fieldControl:ViewContainerRef;
    //@ViewChild('fieldControl') _fieldControl:ElementRef; // Can't use this since it will be just a reference to native element


  constructor(private _componentFactoryResolver:ComponentFactoryResolver){
        // Do nothing
    }

   ngAfterContentInit(): void {
       // Get the control component from factory
        let fieldControlComponent = FieldComponentFactory.getFieldControl(this.field);
        // Create the component factory passing the component.
        let resolver = this._componentFactoryResolver.resolveComponentFactory(fieldControlComponent);
        // Create the component
        let component = this._fieldControl.createComponent(resolver);
        // Get the underlying component instance
        let instance:any = component.instance;
        // Pass the input properties
        instance.field = this.field;
        instance.formGroup = this.formGroup; 
    }

}
