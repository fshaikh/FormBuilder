import {Component,OnInit,Input} from '@angular/core';
import { UIFieldBase } from "formrenderer/controls/uifield-base";


@Component({
    selector:'text-area',
    templateUrl:'./longtext-field.component.html',
    styleUrls:['../control-styles.scss']
})
export class LongTextUIFieldComponent extends UIFieldBase implements OnInit{
    ngOnInit():void{
        
    }

    getStyles():String{
        return "field-inner";
    }
}