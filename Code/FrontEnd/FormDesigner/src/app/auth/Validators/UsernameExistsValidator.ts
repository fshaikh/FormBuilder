import { AbstractControl } from "@angular/forms";
import { Observable } from "rxjs/Observable";
import { UserExistsRequest } from "shared/models/auth/UserExistsRequest";
import { ValidatorFn } from "@angular/forms/src/directives/validators";
import { AuthService } from "shared/services/auth/auth.service";
import { UserExistsResponse } from "shared/models/auth/UserExistsResponse";

/**
 * Async Validator for checking if user exists or not
 * @param request UserExistsRequest. 
 * @param authService AuthService - Service to use to make server call
 * @returns - Key-value pair if validation is unsuccessful, else null
 */
export function userExistsValidator(request:UserExistsRequest,authService:AuthService):ValidatorFn{
    return (control:AbstractControl /*Since the validation can be on a FormGroup/FormCotrol, passes the base class*/):
    Observable<{[key:string]:boolean} | null> =>{
       // Get the value from the passed in control
       request.Value = control.value;

       return authService.isUserExists(request).map((response:UserExistsResponse) => {
            return response.Exists ?  {'exists':true} : null;
       });
       // Key - Name of validation rule. This will be added to erros collection of the passed in form control     
    }
}


//  export class UserExistsValidator{
//      constructor(private _injector:Injector){
//          // Do nothing
//      }

//      validateFactory(request:UserExistsRequest):ValidatorFn{
//         return (control:AbstractControl):Observable<{[key:string]:boolean} | null> =>{
//             // Get the AuthService instance. Since we cant do constructor injection here, we will need a manual way of doing it
    
//            // Get the user name from the passed in control
//            var userName = control.value;

//            console.log(this._injector.get('AuthService'));
    
//            return Observable.of(null);
//            // return Observable.of({'userNameExists':true});   Key - Name of validation rule. This will be added to erros collection of the passed in form control     
//         }
//     }
//  }