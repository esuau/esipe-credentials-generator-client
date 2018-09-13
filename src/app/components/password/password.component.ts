import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  constructor( private _service: UserService, private _router: Router ) { }

  ngOnInit() {
    this._service.user.subscribe(userInfo => {
      if (!userInfo) {
        this.navigateToRoot();
      }
    });
  }

  navigateToRoot(): void {
    this._router.navigate([ '' ]);
  }

}
