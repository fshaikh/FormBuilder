/**
 * Route resolver for My Forms route. This is invoked by Angular when 
 * myforms route is activated. Fetches the forms for the user and sticks the forms data
 * into route. When MyFormsComponent is initialized, it reads the forms data from the route data
 * Using route resolver this way improves the user experience since the user is shown the component
 * only when the data is available. This avoids showing template HTML to the user.
 */

import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";

import { IForm } from "shared/models/IForm";


@Injectable()
export class MyFormsRouteResolver implements Resolve<IForm[]>{

    constructor(){

    }

    /**
     * Resolves the myforms route. This function fetches the forms for a user
     * @param route 
     * @param state 
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IForm[]{
        return null;
    }
}