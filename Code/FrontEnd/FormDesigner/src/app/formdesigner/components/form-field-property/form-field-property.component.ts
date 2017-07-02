/**
 * Component class for Field Property Form
 */

import { Component, OnInit, Input, ViewChild, ViewContainerRef, AfterContentInit, ComponentFactoryResolver, ChangeDetectorRef } from '@angular/core';
import { FieldBase } from "shared/models/FieldBase";
import { FormGroup, FormControl, AbstractControl } from "@angular/forms";
import { KeyValuePair, KeyValuePairGeneric } from "shared/Models/KeyValuePair";
import { FormDesignerStateService } from "app/formdesigner/service/form-designer-state.service";
import { FieldControlAddEventArgs } from "shared/models/FieldControlAddEventArgs";
import { FieldLayoutType } from "shared/models/FieldLayoutType";
import { RowAction } from "shared/models/RowAction";
import FormHelper from "app/formdesigner/service/FormHelper";
import { EnumUtils } from "shared/utils/EnumUtils";
import { FieldType } from "shared/models/FieldType";
import { ControlPropertyComponentFactory } from "app/formdesigner/components/controls-properties/ControlPropertyComponentFactory";


@Component({
    selector:'fd-field-property-form',
    templateUrl:'./form-field-property.component.html',
    styleUrls:['./form-field-property.component.scss']
})
export class FormFieldPropertyComponent{
    fieldControl:FieldBase;
    show:Boolean = true;
    private _rootFormGroup:FormGroup;
    private _rowId:string;
    private fieldLayoutTypes:KeyValuePair[] = [];
    // private fieldPropertyAdvancedComponent:any;
    private _advancedFieldProperty:ViewContainerRef;
    private _advancedPropertyComponentInstance:any;

    @ViewChild('advancedFieldProperty',{read:ViewContainerRef}) set content(content:ViewContainerRef){
        if(content == null){
            return;
        }
        this._advancedFieldProperty = content;
        this._addControlSpecificUI(true);
    }

    /**
     * Initializes a new instance of FormFieldPropertyComponent
     * @param _formsDesignerStateService Form Designer State Service
     * @param _componentFactoryResolver  Component Factory 
     * @param _changeDetectorRef         Change Detector
     */
    constructor(private _formsDesignerStateService:FormDesignerStateService,
                private _componentFactoryResolver:ComponentFactoryResolver,
                private _changeDetectorRef:ChangeDetectorRef){
        // Subscribe for any changes to field 
        this._formsDesignerStateService._formAddFieldObservable.subscribe(
                (args:FieldControlAddEventArgs) => this.onFieldNotify(args)
        );

        this._formsDesignerStateService._formFieldRemoveObservable.subscribe(
                (args:FieldControlAddEventArgs) => this._onFieldRemove(args));
        
        this._formsDesignerStateService._formRowRemoveObservable.subscribe(
            (args:any) => this.hide(null)
        );  

        this.fieldLayoutTypes = FieldLayoutType.getFieldLayouts();
    }

    /**
     * Subscriber function when field is selected by the user
     * @param args 
     */
    public onFieldNotify(args:FieldControlAddEventArgs):void{   
        // Set the field on the field property form
        this.fieldControl = args.field;
        this._rowId = args.rowId;
        this.show = true;
        switch(args.rowAction){
            case RowAction.Added:
                // Add form controls
                this._addFormControls();
                break;
            case RowAction.Selected:
                this._handleRowSelect(args);
                break;
        }
        
    }

    private _onFieldRemove(fieldArgs:FieldControlAddEventArgs):void{
        if(!this.fieldControl){
            return;
        }
        if(this.fieldControl.id !== fieldArgs.field.id){
            return;
        }

        // Restore to original state
        this.fieldControl = null;
    }

    /**
     * Adds form controls
     */
    private _addFormControls():void{
        this._rootFormGroup = new FormGroup({});

        this._rootFormGroup.valueChanges.debounceTime(300).subscribe(
                (args:any) => this.onFieldPropertyChange(args)
            );

        this._addGeneralControls();
        this._addLayoutControls();
        this._addValidationControls(); 

        if(this._advancedFieldProperty != null){
            this._addControlSpecificUI();
        }
    }

    onFieldPropertyChange(formData:any):void{
        // process the form data before dispatching 
        this._advancedPropertyComponentInstance.processModel(formData);
        let args:FieldControlAddEventArgs = new FieldControlAddEventArgs();
        args.field = formData;
        args.rowId = this._rowId;

        this._formsDesignerStateService.onFieldPropertyChange(args) ;
    }

    _handleRowSelect(args:FieldControlAddEventArgs):void{
        this._addControlSpecificUI();
        this._rootFormGroup.patchValue(args.field,false);  
    }

    _addGeneralControls():void{
        // id
        let idFormControl:FormControl = new FormControl(FormHelper.getFormControlState(this.fieldControl.id,false));
        // Name
        let nameFormControl:FormControl = new FormControl(FormHelper.getFormControlState(this.fieldControl.name,false));
        // Label
        let labelFormControl:FormControl = new FormControl(FormHelper.getFormControlState(this.fieldControl.label,false));
        // Required
        let requiredFormControl:FormControl = new FormControl(FormHelper.getFormControlState(this.fieldControl.required,false));
        // Type
        let typeFormControl:FormControl = new FormControl(FormHelper.getFormControlState(this.fieldControl.type,false));
        let typeValueFormControl:FormControl = new FormControl(FormHelper.getFormControlState(EnumUtils.getEnumString(FieldType,this.fieldControl.type),true));

        this._rootFormGroup.addControl("id",idFormControl);
        this._rootFormGroup.addControl("name",nameFormControl);
        this._rootFormGroup.addControl("label",labelFormControl); 
        this._rootFormGroup.addControl("required",requiredFormControl);
        this._rootFormGroup.addControl("type",typeFormControl);
        this._rootFormGroup.addControl("typeValue",typeValueFormControl);
    }

    _addLayoutControls():void{
         // Layout
        let layoutFormControl:FormControl = new FormControl(FormHelper.getFormControlState(this.fieldControl.layoutType,false));
        this._rootFormGroup.addControl("layoutType",layoutFormControl);
    }

    _addValidationControls():void{
        // Required
        let requiredFormControl:FormControl = new FormControl(FormHelper.getFormControlState(this.fieldControl.required,false));
        this._rootFormGroup.addControl("required",requiredFormControl);
    }

    _addControlSpecificUI(detectChanges:Boolean = false):void{
        this._setAdvancedPropertyComponent();
        let formControls:KeyValuePairGeneric<string,FormControl>[] = this._advancedPropertyComponentInstance.getFormControls(this.fieldControl,this._rootFormGroup);
        formControls.forEach((element:KeyValuePairGeneric<string,AbstractControl>) => {
            this._rootFormGroup.addControl(element.key,element.value);
        });

        // Not calling this explicitly was throwing "Expression has changed after it was checked""
        // http://stackoverflow.com/questions/41283293/angular-2-expression-has-changed-after-it-was-checked
        if(detectChanges){
            this._changeDetectorRef.detectChanges();
        }
        

        // Ang 4 Way - Cant use because of limitations. See HTML for comments
        // this.fieldPropertyAdvancedComponent = ControlPropertyComponentFactory.getFieldPropertyControl(this.fieldControl);
        // console.log(this.fieldPropertyAdvancedComponent);

    }

    private _setAdvancedPropertyComponent():void{
        // Get the control component from factory
         let fieldControlComponent =  ControlPropertyComponentFactory.getFieldPropertyControl(this.fieldControl);
        // // Create the component factory passing the component.
         let resolver = this._componentFactoryResolver.resolveComponentFactory(fieldControlComponent);
         // destroy all views in the container. This ensures that duplicate dynamic components are not rendered
         this._advancedFieldProperty.clear();
        // // Create the component
         let component = this._advancedFieldProperty.createComponent(resolver);
        // // Get the underlying component instance
        this._advancedPropertyComponentInstance = component.instance;
    }

    hide(e:any):void{
        this.show = false;
    }

    getLabelPlaceholder():String{
        return "Label Text";
    }

    getLabelValue():String{
    return this.fieldControl.label;
  }

  getLabelFormControlName():String{
      return "label";
  }

    

  getRequiredFormControlName():String{
      return "required";
  }

  getRequiredText():String{
      return "Required";
  }
  getRequiredValue():Boolean{
      return this.fieldControl.required;
  }

  getLayoutTypeFormControlName():String{
      return "layoutType";
  }

  getLayoutTypeText():String{
      return "Select Field Layout";
  }

  getFieldLayoutValues():KeyValuePair[]{
      return this.fieldLayoutTypes;
  }
}