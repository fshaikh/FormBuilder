import {Component,OnInit,Input} from '@angular/core';
import { UIFieldBase } from "formrenderer/controls/uifield-base";


@Component({
    selector:'date',
    templateUrl:'./date-field.component.html',
    styleUrls:['../control-styles.scss']
})
export class DateUIFieldComponent extends UIFieldBase implements OnInit{

    ngOnInit():void{
        
    }
}