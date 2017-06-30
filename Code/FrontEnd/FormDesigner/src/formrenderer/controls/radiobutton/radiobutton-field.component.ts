import {Component,OnInit,Input} from '@angular/core';
import { UIFieldBase } from "formrenderer/controls/uifield-base";


@Component({
    selector:'radio',
    templateUrl:'./radiobutton-field.component.html',
    styleUrls:['../control-styles.scss']
})
export class RadiobuttonUIFieldComponent extends UIFieldBase implements OnInit{

    ngOnInit():void{
        
    }

    getValues():any{
        let dropdownField:any = this.field;
        return dropdownField.values;
    }
}