import { Component, OnInit } from '@angular/core';
import { FieldControlAddEventArgs } from "shared/models/FieldControlAddEventArgs";
import { FormDesignerStateService } from "app/formdesigner/service/form-designer-state.service";
import { RowAction } from "shared/models/RowAction";


@Component({
    selector:'fd-field-row',
    templateUrl:'./form-field-control.component.html',
    styleUrls:['./form-field-control.component.scss']
})
export class FormFieldControlComponent implements OnInit{
    public fieldArgs:FieldControlAddEventArgs;
    private originalFieldLabel:string;
    private isSelected:boolean = false;

    constructor(private _formsDesignerStateService:FormDesignerStateService){
        // Subscribe for any changes to field 
        this._formsDesignerStateService._formFieldPropertyChangeObservable.subscribe(

                (args:FieldControlAddEventArgs) => this.onFieldPropertyChange(args)
        );

        this._formsDesignerStateService._formAddFieldObservable.subscribe(
                (args:FieldControlAddEventArgs) => this.onFieldSelected(args)
        );
    }

    ngOnInit():void{
        if(this.fieldArgs != null){
            this.originalFieldLabel = this.fieldArgs.field.label;
        }
        
    }

    onFieldPropertyChange(args:FieldControlAddEventArgs):void{
       
        if(this.fieldArgs != null && args.field.id !== this.fieldArgs.field.id){
            return;
        }
        this.fieldArgs = args;
        
    }

    onRemove(e:any):void{
        this._formsDesignerStateService.onFieldRemove(this.fieldArgs);
    }

    getFieldLabel():string{
        let labelVal:string = this.fieldArgs.field.label;
        return (labelVal == null || labelVal == '') ? this.originalFieldLabel : labelVal;
    }

    /**
     * Event handler when the field is selected
     * @param e Event
     */
    onFieldSelect(e:any):void{
        // Set the selected class on the element
        this.isSelected = true;

        this.fieldArgs.rowAction = RowAction.Selected;
        // user has selected the field. inform the state service
        this._formsDesignerStateService.fieldSelected(this.fieldArgs);
    }

    onFieldSelected(args:FieldControlAddEventArgs):void{
        if(args.field.id !== this.fieldArgs.field.id){
            this.isSelected = false;
        }
    }
    
}