import { TestBed, inject } from '@angular/core/testing';

import { UserService } from './user.service';

describe('UserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });

  it('should get user information', inject([UserService], (service: UserService) => {
    const userInfo = {
      email: 'email@u-pec.fr',
      level: { text: 'ING1', value: 'I1' }
    };
    service.user = userInfo;
    service.user.subscribe((data) => {
      expect(data).toEqual(userInfo);
    });
  }));
});
