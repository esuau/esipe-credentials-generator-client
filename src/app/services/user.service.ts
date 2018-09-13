import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _user = new BehaviorSubject(null);
  get user(): any {
    return this._user.asObservable();
  }
  set user(value: any) {
    this._user.next(value);
  }

  constructor() { }

}
