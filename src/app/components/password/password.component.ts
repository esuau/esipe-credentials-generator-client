import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {

  private _user;

  username: string;

  password: string;

  constructor( private _service: UserService, private _router: Router, public snackBar: MatSnackBar ) { }

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

  copyToClipboard(type: string) {
    let selectionBox = document.createElement('textarea');
    selectionBox.style.position = 'fixed';
    selectionBox.style.left = '0';
    selectionBox.style.top = '0';
    selectionBox.style.opacity = '0';
    selectionBox.value = type === 'password' ? this.password : this.username;
    document.body.appendChild(selectionBox);
    selectionBox.focus();
    selectionBox.select();
    document.execCommand('copy');
    document.body.removeChild(selectionBox);

    let message: string;
    if ( type === 'username' ) {
      message = 'Username ';
    } else {
      message = 'Password ';
    }
    message += 'copied to clipboard!';
    this.openSnackBar(message);
  }

  navigateToRoot(): void {
    this._router.navigate([ '' ]);
  }

  private getUsername(): string {
    return this._user.level + '-' + this.getRandomInt(100, 1);
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

  private openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
    });
  }

}
