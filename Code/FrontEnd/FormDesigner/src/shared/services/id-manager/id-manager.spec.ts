import { TestBed, inject } from '@angular/core/testing';

import { IdService } from './id-manager.service';

describe('IdService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IdService]
    });
  });

  it('should be created', inject([IdService], (service: IdService) => {
    expect(service).toBeTruthy();
  }));

  it('should give unique ids',inject([IdService],(service:IdService)=> {
        let id1:string = service.nextId();
        let id2:string = service.nextId();

        expect(id1 === id2).toBeFalsy();
  }));
});