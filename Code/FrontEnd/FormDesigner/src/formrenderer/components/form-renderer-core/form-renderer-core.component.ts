/**
 * Core Form Renderer Component. Acts as the root component
 */

import { Component, OnInit, Input } from '@angular/core';
import { Form } from "shared/models/Form";
import { FormGroup, FormControl, ValidatorFn, Validators } from "@angular/forms";
import { FieldBase } from "shared/models/FieldBase";
import { Row } from "shared/models/Row";
import { RowType } from "shared/models/RowType";
import { DefinedValidators } from "shared/models/DefinedValidators";

@Component({
  selector: 'fd-form-renderer-core',
  templateUrl: './form-renderer-core.component.html',
  styleUrls: ['./form-renderer-core.component.scss']
})
export class FormRendererCoreComponent implements OnInit {
  @Input() form:Form;
  _rootFormGroup:FormGroup;
  _fields:FieldBase[] = [];
  _rows:Row[];
  rowType = RowType;
  /**
   * Initializes a new instance of FormRendererCoreComponent
   */
  constructor() { }
 
  ngOnInit() {
     // create the root form group
       this._rootFormGroup = new FormGroup(
            {
                
            });
       this._handleFormResponse(this.form);
      
  }

  _handleFormResponse(form:Form){
        this._rows = form.tabs[0].rows;
        for(let row of this._rows){
            let fields:FieldBase[] = row.fields;
            for(let field of fields){
                this._rootFormGroup.addControl(field.name,this._createFormControl(field));
                this._fields.push(field);
            }
        }
    }

        _createFormControl(field:FieldBase):FormControl{
        // create FormControl instance
        let formControl:FormControl = new FormControl(this._getFormControlState(field));

        // add Validators
        //this._addValidators(field,formControl);

        return formControl;
    }

    _getFormControlState(field:FieldBase):any{
        // You can't use the value key without the disabled key; both are required to use this way of initialization.
        return {
            value:field.value,
            disabled:field.readOnly
        };
    }

    // This function adds validators to the control
    _addValidators(field:FieldBase,formControl:FormControl):void{
        let validatorFns:ValidatorFn[] = [];
        if(field.required){
            validatorFns.push(Validators.required);
        }
        // Add support for OOB Validators:
        // minLength, maxLength, pattern (regex-based)
        let definedValidators = field.validators;
        let length = definedValidators.length;
        for(let validator of definedValidators){
            if(validator.key === DefinedValidators.MinLength){
                validatorFns.push(Validators.minLength(validator.validatorData.length));
            }
            else if(validator.key === DefinedValidators.MaxLength){
                validatorFns.push(Validators.maxLength(validator.validatorData.length));
            }
            // Custom Validators HERE ---
            else if(validator.key === DefinedValidators.Test){
                //validatorFns.push(TestValidatorFactory(validator.validatorData.data));
            }
        }

        formControl.setValidators(validatorFns);
    }

    getRowClasses(row:Row):string[]{
        let classes:string[] = [];
        switch(row.rowType){
            case this.rowType.Left:
            case this.rowType.Span:
                classes.push('row-container-left');
                break;
            case this.rowType.Right:
                classes.push('row-container-right');
                break;
            case this.rowType.Both:
                classes.push('row-container-both');
                break;
        }

        return classes;
    }

    getFieldContainerClasses(row:Row):string[]{
        let classes:string[] = [];
        switch(row.rowType){
            case this.rowType.Left:
            case this.rowType.Right:
            case this.rowType.Both:
                classes.push('field-container-normal');
                break;
            
            case this.rowType.Span:
                classes.push('field-container-span');
                break;
        }
        return classes;
    }

    getSubmitText():String{
        return "Submit";
    }

    getStyles():String{
        return "submit-btn";
    }

}
