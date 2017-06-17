import {Component,OnInit,Input} from '@angular/core';
import { UIFieldBase } from "formrenderer/controls/uifield-base";
import { KeyValuePair } from "shared/Models/KeyValuePair";
import { DropdownField } from "shared/models/DropdownField";


@Component({
    selector:'dropdown',
    templateUrl:'./dropdown-field.component.html',
    styleUrls:['../control-styles.scss']
})
export class DropdownUIFieldComponent extends UIFieldBase implements OnInit{

    ngOnInit():void{
        
    }

    getDropdownValues():any{
        let dropdownField:any = this.field;
        return dropdownField.values;
    }
}