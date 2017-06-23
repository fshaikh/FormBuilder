import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FieldBase } from "shared/models/FieldBase";
import { RowAddedEventArgs } from "shared/models/RowAddedEventArgs";
import { IdService } from "shared/services/id-manager/id-manager.service";
import { FormDesignerStateService } from "app/formdesigner/service/form-designer-state.service";
import { SystemConstants } from "shared/models/SystemConstants";
import { IconFactory } from "shared/models/IconFactory";


@Component({
    selector:'fd-form-control-panel',
    templateUrl:'./form-control-panel.component.html',
    styleUrls:['./form-control-panel.component.scss']
})
export class FormControlPanelComponent{
    @Input() Controls:FieldBase[];
    //@Output() RowAdded:EventEmitter<RowAddedEventArgs> = new EventEmitter<RowAddedEventArgs>();
    private _AddRowObservable:any = null;

    constructor(private _formsDesignerStateService:FormDesignerStateService,private _idService:IdService){
        // Do nothing
    }

    /**
     * Event handler for "Add Row"
     * @param e 
    */
    onRowAdd(e:any):void{
        if(e.preventDefault){
            e.preventDefault();
        }
        let args:RowAddedEventArgs = new RowAddedEventArgs();
        // Get the row id from Id service
        args.Id = this._idService.nextId();
        // Fire the event to interested subscribers
        this._formsDesignerStateService.addRow(args);
    }

    /**
     * Event handler when user starts dragging the form element
     * @param e Event
     */
    onDragStart(e:any):void{
        let sourceElement = e.srcElement;
        let controlType = sourceElement.attributes["data-control"].value;
        let fieldControl = this.Controls.find((fieldBase:FieldBase) => fieldBase.type === +controlType);
        if(fieldControl == null)
            return;
        
        e.dataTransfer.setData(SystemConstants.JSON_MIMETYPE,JSON.stringify(fieldControl));
    }

    getTabLabel():string{
        return "Basic";
    }  

    getControlIcon(control:FieldBase):string[]{
         let classes:string[] = ['icon'];
         classes.push(IconFactory.getIcon(control));
        
        return classes;
    }
}