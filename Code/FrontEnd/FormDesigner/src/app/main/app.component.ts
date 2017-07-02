import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from "@angular/router";

@Component({
  selector: 'fd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fd works!';

  constructor(private _router:Router){
    this._router.events.subscribe((event:any) => {
      if (event instanceof NavigationStart) {
            console.log('navigation start');
        }
      if (event instanceof NavigationEnd) {
            console.log('navigation end');
        }

        // Set loading state to false in both of the below events to hide the spinner in case a request fails
        if (event instanceof NavigationCancel) {
            console.log('navigation cancel');
        }
        if (event instanceof NavigationError) {
            console.log('navigation error');
        }
    });
  }
}
