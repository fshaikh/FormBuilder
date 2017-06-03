/**
 * My Forms module
 */

// Angular modules
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CommonModule} from '@angular/common';

// Feature modules
import {SharedModule} from '../../shared/shared.module';

// My Forms related imports
import { MyFormsComponent } from "app/myforms/components/myforms.component";
import { MyFormsRouteResolver } from "app/myforms/myforms-route.resolver";
import { UiModule } from "ui/ui.module";
import { FormListComponent } from "app/myforms/components/formlist/formlist.component";

// Routes table. Always define specific routes first
const routes: Routes = [
  {  path: 'myforms',resolve:{myforms:MyFormsRouteResolver},component:MyFormsComponent  }
];

@NgModule({
    declarations:[
            MyFormsComponent,
            FormListComponent
        ],
    imports:[
        RouterModule.forChild(routes),
        SharedModule,
        UiModule,
        CommonModule
    ],
    providers:[
        MyFormsRouteResolver
    ]
})
export class MyFormsModule{

}