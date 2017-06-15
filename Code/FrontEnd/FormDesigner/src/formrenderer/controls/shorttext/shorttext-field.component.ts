import { Component, OnInit, Input } from '@angular/core';
import { UIFieldBase } from "formrenderer/controls/uifield-base";



@Component({
    selector:'text-box',
    templateUrl:'./shorttext-field.component.html',
   // styleUrls:UIFieldBase._styleUrls
    styleUrls:['../control-styles.scss']
})
export class ShortTextUIFieldComponent extends UIFieldBase implements OnInit{

    ngOnInit():void{
        
    }
}