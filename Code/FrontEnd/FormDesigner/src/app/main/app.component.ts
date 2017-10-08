import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from "@angular/router";
import { AuthStateService } from "shared/services/auth/auth-state-service";

@Component({
  selector: 'fd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fd works!';

  constructor(private _router:Router,private _authStateService:AuthStateService){
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

  showLogin():boolean{
        return !this._authStateService.isAuthenticated();
    }

    getUser():String{
      var user = this._authStateService.getCurrentUser();
      return  user!= null ? user.userName : "Guest";
    }
}
