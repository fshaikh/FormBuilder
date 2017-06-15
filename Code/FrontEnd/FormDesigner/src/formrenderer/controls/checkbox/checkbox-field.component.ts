import {Component,OnInit,Input} from '@angular/core';
import { UIFieldBase } from "formrenderer/controls/uifield-base";


@Component({
    selector:'check-box',
    templateUrl:'./checkbox-field.component.html',
    styleUrls:['../control-styles.scss']
})
export class CheckboxUIFieldComponent extends UIFieldBase implements OnInit{

    ngOnInit():void{
        
    }
}