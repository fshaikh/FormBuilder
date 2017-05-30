/**
 * My Forms module
 */

// Angular modules
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Feature modules
import {SharedModule} from '../../shared/shared.module';

// My Forms related imports
import { MyFormsComponent } from "app/myforms/components/myforms.component";
import { MyFormsRouteResolver } from "app/myforms/myforms-route.resolver";

// Routes table. Always define specific routes first
const routes: Routes = [
  {  path: 'myforms',resolve:{myforms:MyFormsRouteResolver},component:MyFormsComponent  }
];

@NgModule({
    declarations:[
            MyFormsComponent
        ],
    imports:[
        RouterModule.forChild(routes),
        SharedModule
    ],
    providers:[
        MyFormsRouteResolver
    ]
})
export class MyFormsModule{

}