import { TestBed, inject } from '@angular/core/testing';

import { UserService } from './user.service';

import { of } from 'rxjs';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService]
    });
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));

  it('should get user information', inject([UserService], (service: UserService, done: any) => {
    const userInfo = {
      email: 'email@u-pec.fr',
      level: { text: 'ING1', value: 'I1' }
    };
    service.user = userInfo;
    service.user.subscribe((data) => {
      expect(data).toEqual(userInfo);
      done();
    });
  }));
});
