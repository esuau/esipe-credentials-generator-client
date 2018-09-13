import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  private _user;

  username: string;

  password: string;

  constructor( private _service: UserService, private _router: Router ) { }

  ngOnInit() {
    this._service.user.subscribe(userInfo => {
      if (!userInfo) {
        this.navigateToRoot();
      } else {
        this._user = userInfo;
        this.username = this.getUsername();
        this.password = this.getPassword(8);
      }
    });
  }

  private getUsername(): string {
    return this._user.level + '-' + this.getRandomInt(100, 1);
  }

  navigateToRoot(): void {
    this._router.navigate([ '' ]);
  }

  private getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private getPassword(length: number): string {
    const chars = 'abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+<>ABCDEFGHIJKLMNOP1234567890';
    let pass = '';
    for (let x = 0; x < length; x++) {
        const i = Math.floor(Math.random() * chars.length);
        pass += chars.charAt(i);
    }
    return pass;
  }

}
