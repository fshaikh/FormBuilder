import { TestBed, inject } from '@angular/core/testing';

import { NotificationBarService } from './notification-bar.service';

describe('NotificationBarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificationBarService]
    });
  });

  it('should be created', inject([NotificationBarService], (service: NotificationBarService) => {
    expect(service).toBeTruthy();
  }));
});
