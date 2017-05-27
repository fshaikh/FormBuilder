import {Injectable} from '@angular/core';
import {UUID} from 'angular2-uuid';

// Service for generating unique id to be used in the application
@Injectable()
export class IdService{

    // This function returns the next unique id
    public nextId():string{
        return UUID.UUID();
    }    
}