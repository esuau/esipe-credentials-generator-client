import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {

  infoForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern('^[a-z0-9!#$%&*+\/=?^_`{|}~.-]+@(etu.)?u-pec.fr')
    ]),
    level: new FormControl('', [
      Validators.required
    ])
  });

  matcher = new MyErrorStateMatcher();

  levels = [
    { text: 'ING 1', value: 'I1' },
    { text: 'ING 2', value: 'I2' },
    { text: 'ING 3', value: 'I3' }
  ];

  constructor() { }

  ngOnInit() {
  }

}
