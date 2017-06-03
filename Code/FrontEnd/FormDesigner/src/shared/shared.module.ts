/**
 * Shared Module to be used across Form Designer and Form Submitter applications
 */

import {NgModule} from '@angular/core';
import { Http, RequestOptions, ConnectionBackend } from '@angular/http';

import { IdService } from './services/id-manager/id-manager.service';
import { FormsService } from "shared/services/forms/forms.service";
// import { HttpInterceptor } from "shared/http/HttpInterceptor";

@NgModule({
    providers:[
        IdService,
        FormsService
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