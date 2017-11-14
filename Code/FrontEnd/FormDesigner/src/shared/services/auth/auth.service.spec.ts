import { UserTypeEnum } from './../../models/auth/UserTypeEnum';
import { UserExistsRequest } from './../../models/auth/UserExistsRequest';
import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  it('should return 200 for an existing user', inject([AuthService], (service: AuthService) => {
    var request = new UserExistsRequest();
    request.Type = UserTypeEnum.Username;
    request.Value = "test";
    expect(service.isUserExists(request)).toBeDefined();
  }));

});
