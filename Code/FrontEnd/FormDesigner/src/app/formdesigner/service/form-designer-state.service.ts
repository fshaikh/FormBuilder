import {Injectable} from '@angular/core';
import { Subject, Observable } from 'rxjs/Rx';
import { Form } from "shared/models/Form";
import { RowAddedEventArgs } from "shared/models/RowAddedEventArgs";
import { FieldControlAddEventArgs } from "shared/models/FieldControlAddEventArgs";
import { IdService } from "shared/services/id-manager/id-manager.service";
import { Row } from "shared/models/Row";
import { RowType } from "shared/models/RowType";
import { FieldBase } from "shared/models/FieldBase";
import { Tab } from "shared/models/Tab";



@Injectable()
export class FormDesignerStateService{
    private _form:Form = null;
    private _formName:string;

    private _formAddRowSource = new Subject<RowAddedEventArgs>();
    private _formAddFieldSource = new Subject<FieldControlAddEventArgs>();
    private _formFieldPropertyChangeSource = new Subject<FieldControlAddEventArgs>();
    private _formFieldRemoveSource = new Subject<FieldControlAddEventArgs>();

    public _formAddRowObservable:Observable<RowAddedEventArgs> = null;
    public _formAddFieldObservable:Observable<FieldControlAddEventArgs> = null;
    public _formFieldPropertyChangeObservable:Observable<FieldControlAddEventArgs> = null;
    public _formFieldRemoveObservable:Observable<FieldControlAddEventArgs> = null;

    private _fieldNameIndex:number = 1;

    constructor(private _idService:IdService){
        this._formAddRowObservable = this._formAddRowSource.asObservable();
        this._formAddFieldObservable = this._formAddFieldSource.asObservable();
        this._formFieldPropertyChangeObservable = this._formFieldPropertyChangeSource.asObservable();
        this._formFieldRemoveObservable = this._formFieldRemoveSource.asObservable();

        this._initialize();
        
    } 

    public getFieldName(fieldName:string):string{
        return fieldName + this._fieldNameIndex++;
    }

    public addRow(rowArgs:RowAddedEventArgs):void{
        // Call next on the Observable
        this._formAddRowSource.next(rowArgs);

        // Create a row object
        let row:Row = new Row();
        // Add to form
        row.fields = [];
        row.rowType = RowType.Left;
        row.id = rowArgs.Id;

        this._form.tabs[0].rows.push(row);
    } 

    public addField(fieldArgs:FieldControlAddEventArgs):void{
        // fetch the row from the state based on passed in row id
        let row = this.lookupRow(fieldArgs.rowId);
        if(row === null){
            return;
        }
        // replace the field with the passed in value
        if(fieldArgs.field == null){
            return;
        }

        row.fields.push(fieldArgs.field);
        // Call next on the Observable
        this._formAddFieldSource.next(fieldArgs);
    }

    /**
     * Call this function when a field is selected on the canvas. Notifies the interested subscribers of the Add Field event
     * @param fieldArgs FieldControlAddEventArgs containing the selected field
     */
    public fieldSelected(fieldArgs:FieldControlAddEventArgs):void{
        // Call next on the Observable
        this._formAddFieldSource.next(fieldArgs);
    }

    public onFieldPropertyChange(fieldArgs:FieldControlAddEventArgs):void{
       // fetch the row from the state based on passed in row id
        let row = this.lookupRow(fieldArgs.rowId);
        if(row == null){
            return;
        }
        let fields:any = row.fields;
        let field = fields.find((field:FieldBase) => {
            if(field == null){
                return false;
            }
            return field.id === fieldArgs.field.id;
        });
        if(field == null){
            fields.push(field);
        }else{
            let index = this.getIndexOf(fields,field.id);
            row.fields[index] = fieldArgs.field;
        }
        // TODO: update the rows layout property value
        this._updateRowType(row,fieldArgs);

        console.log(fieldArgs.field);

        this._formFieldPropertyChangeSource.next(fieldArgs);
    }

    public onFieldSelect(fieldArgs:FieldControlAddEventArgs):void{
        // 
    }

    public onFieldRemove(fieldArgs:FieldControlAddEventArgs):void{
        let fieldId:string = fieldArgs.field.id;
        let fields:FieldBase[] = this.lookupRow(fieldArgs.rowId).fields;
        let fieldsLength = fields.length;
        let fieldIndex:number = this.getIndexOf(fields,fieldId);

         if(fieldIndex === -1){
             return;
         }

         // Remove the field from the row
         fields.splice(fieldIndex,1);

         // Notify the subscribers
         this._formFieldRemoveSource.next(fieldArgs);
    }

    public getFormMeta(toJson:boolean,formName:string):any{
        this._form.name = formName;
        return toJson ? JSON.stringify(this._form): this._form;
    }

    private _initialize(){
        this._form = new Form();
        this._form.id = this._idService.nextId();
        this._form.tabs = [];

        let tab = new Tab();
        tab.id = this._idService.nextId();
        tab.name = "Tab";
        tab.ordinal = 0;
        tab.rows = [];
        this._form.tabs.push(tab);
    }

    public lookupRow(rowId:string):Row{
        // fetch the row from the state based on passed in row id
        return this._form.tabs[0].rows.find((row) => row.id === rowId);   
    }

    public hasFormMeta():Boolean{
        if(!this._form){
            return false;
        }
        return this._form.tabs && this._form.tabs[0].rows.length > 0;
    }

    private getIndexOf(array:any,item:any):number{
        let index = -1,
            length = array.length;
        for(let i = 0;i<length;i++){
            if(array[i].id === item){
                return i;
            }
        }
        return index;
    }

    // Updates the row type based on the following algo:
    // 1. If row contains 2 fields => Both
    // 2. Else field's layout type
    private _updateRowType(row:Row,fieldArgs:FieldControlAddEventArgs):void{
        if(row.fields.length == 2){
            row.rowType = RowType.Both;
            return;
        }
        row.rowType = +fieldArgs.field.layoutType;
    }

}