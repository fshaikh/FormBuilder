/**
 * Defines animations for route transitions
 */

import { trigger, state, style, transition, animate } from "@angular/core";

// Angular Animations can be interpreted in the following way:
// 1. When a component state changes
//        2. Trigger animation (trigger name)
//        3. If state === <value>,  apply <style>
//        4. Apply transition beetween states
export const RouteTransition = 
    trigger('routeTransition',[
      state('in',style({transform:'translateY(0px)',opacity:'1'})),
      transition('void => *',[
        style({transform:'translateY(30px)',opacity:'1'}),
        animate('1000ms ease-out')
      ])
    ]);