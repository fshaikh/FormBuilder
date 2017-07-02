import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { RowAddedEventArgs } from "shared/models/RowAddedEventArgs";
import { FormRowComponent } from "app/formdesigner/components/form-row/form-row.component";
import { FormDesignerStateService } from "app/formdesigner/service/form-designer-state.service";
import { IDisposable } from "shared/interfaces/IDisposable";


@Component({
    selector:'fd-form-canvas',
    templateUrl:'./form-canvas.component.html',
    styleUrls:['./form-canvas.component.scss']
})
export class FormCanvasComponent implements OnInit, IDisposable {
    @ViewChild('rowContainer',{read:ViewContainerRef}) _rowContainer:ViewContainerRef;

    constructor(private _componentFactoryResolver:ComponentFactoryResolver,
                private _formsDesignerStateService:FormDesignerStateService){
        // Do nothing
        this._formsDesignerStateService._formAddRowObservable.subscribe(
            (args:RowAddedEventArgs) => this.onRowAdded(args)
         );

         this._formsDesignerStateService._formRowRemoveObservable.subscribe(
            (args:RowAddedEventArgs) => this.onRowRemoved(args)
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
     * Event handler for removing row
     * @param args Row to be removed
     */
    onRowRemoved(args:RowAddedEventArgs):void{
         // find the index of the field row component
        let length = this._rowContainer.length;
        let viewIndex:number = -1;
        for(let index = 0;index<length;index++){
            // TODO: Need to find a better way of finding the child view. This looks too leaky
            let view:any = this._rowContainer.get(index);
            let attr = view.rootNodes[0].firstElementChild.attributes[3];
            if(attr == null)
            {
                return;
            }
            let id:string = attr.value;
            if(id === args.Id){
                viewIndex = index;
                break;
            }
        }
        if(viewIndex !== -1){
            // Remove the row control component
            this._rowContainer.remove(viewIndex);
        }
    }

    /**
     * Returns whether to show instructions to the user in the form designer
     */
    showInstructions():Boolean{
        return !this._formsDesignerStateService.hasFormMeta();
    }

    dispose(): void {
    }
}