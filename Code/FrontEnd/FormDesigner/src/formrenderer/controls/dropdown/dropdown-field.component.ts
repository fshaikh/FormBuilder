import {Component,OnInit,Input} from '@angular/core';
import { UIFieldBase } from "formrenderer/controls/uifield-base";


@Component({
    selector:'dropdown',
    templateUrl:'./dropdown-field.component.html',
    styleUrls:['../control-styles.scss']
})
export class DropdownUIFieldComponent extends UIFieldBase implements OnInit{

    ngOnInit():void{
        
    }
}