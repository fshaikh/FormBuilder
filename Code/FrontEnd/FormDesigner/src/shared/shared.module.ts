/**
 * Shared Module to be used across Form Designer and Form Submitter applications
 */

import {NgModule} from '@angular/core';
import { Http, RequestOptions, ConnectionBackend } from '@angular/http';

import { IdService } from './services/id-manager/id-manager.service';
import { FormsService } from "shared/services/forms/forms.service";
import { AuthService } from "shared/services/auth/auth.service";
import { AuthStateService } from "shared/services/auth/auth-state-service";
// import { HttpInterceptor } from "shared/http/HttpInterceptor";

@NgModule({
    providers:[
        // This is a provider recipe. First parameter is a token property and
        // 2nd one is a recipe (used to create service instance)
        { provide:IdService, useClass:IdService},
        FormsService,
        AuthService,
        AuthStateService
    //     {
    //         provide:'http',
    //         useFactory:(backend: ConnectionBackend, options: RequestOptions) => {
    //         return new HttpInterceptor(backend, options);
    //         },
    //         deps: [ConnectionBackend, RequestOptions]
    //    }
    ]
})
export class SharedModule{

}