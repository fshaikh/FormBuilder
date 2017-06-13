import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { RowAddedEventArgs } from "shared/models/RowAddedEventArgs";
import { FormRowComponent } from "app/formdesigner/components/form-row/form-row.component";
import { FormDesignerStateService } from "app/formdesigner/service/form-designer-state.service";


@Component({
    selector:'fd-form-canvas',
    templateUrl:'./form-canvas.component.html',
    styleUrls:['./form-canvas.component.scss']
})
export class FormCanvasComponent implements OnInit{
    @ViewChild('rowContainer',{read:ViewContainerRef}) _rowContainer:ViewContainerRef;

    constructor(private _componentFactoryResolver:ComponentFactoryResolver,private _formsDesignerStateService:FormDesignerStateService){
        // Do nothing
        this._formsDesignerStateService._formAddRowObservable.subscribe(
            (args:RowAddedEventArgs) => this.onRowAdded(args)
         );
    }

    ngOnInit():void{

    }

    onRowAdded(args:RowAddedEventArgs):void{
        // Create the component factory passing the component.
        let resolver = this._componentFactoryResolver.resolveComponentFactory(FormRowComponent);
        // Create the component
        let component = this._rowContainer.createComponent(resolver);
        // Get the underlying component instance
        let instance:any = component.instance;
        // Pass the input properties
        instance.RowAddArgs = args;
    }  

    /**
     * Returns whether to show instructions to the user in the form designer
     */
    showInstructions():Boolean{
        return !this._formsDesignerStateService.hasFormMeta();
    }
}