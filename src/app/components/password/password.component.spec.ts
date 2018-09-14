import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material';

import { AppRoutingModule } from '../../app.routing';
import { EmailComponent } from '../email/email.component';
import { PasswordComponent } from './password.component';
import { UserService } from '../../services/user.service';

describe('PasswordComponent', () => {
  let component: PasswordComponent;
  let fixture: ComponentFixture<PasswordComponent>;
  let service: UserService;
  let snackbar: MatSnackBar;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EmailComponent,
        PasswordComponent
      ],
      imports: [
        AppRoutingModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatSnackBarModule,
        ReactiveFormsModule
      ],
      providers: [ UserService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to EmailComponent if email and level are null', () => {
    service = TestBed.get(UserService);
    spyOn(component, 'navigateToRoot');
    service.user = null;
    expect(component.navigateToRoot).toHaveBeenCalled();
  });

  it('should get username depending on level', () => {
    service = TestBed.get(UserService);
    service.user = {
      email: 'email@u-pec.fr',
      level: 'I1'
    };
    expect(component.username.substring(0, 3)).toEqual('I1-');
  });

  it('should get password with 8 characters', () => {
    service = TestBed.get(UserService);
    service.user = {
      email: 'email@u-pec.fr',
      level: 'I1'
    };
    expect(component.password.length).toEqual(8);
  });

  it('should copy username to clipboard', () => {
    spyOn(component, 'copyToClipboard');
    component.username = 'IX-XX';
    const field = fixture.debugElement.nativeElement.querySelector('mat-form-field:nth-child(1)');
    field.click();
    expect(component.copyToClipboard).toHaveBeenCalled();
  });

  it('should copy password to clipboard', () => {
    spyOn(component, 'copyToClipboard');
    component.password = 'abcdefg$';
    const field = fixture.debugElement.nativeElement.querySelector('mat-form-field:nth-child(2)');
    field.click();
    expect(component.copyToClipboard).toHaveBeenCalled();
  });

  it('should show snackbar when username is copied', () => {
    snackbar = TestBed.get(MatSnackBar);
    spyOn(snackbar, 'open');
    component.password = 'abcdefg$';
    const field = fixture.debugElement.nativeElement.querySelector('mat-form-field:nth-child(1)');
    field.click();
    expect(snackbar.open).toHaveBeenCalled();
  });

  it('should show snackbar when password is copied', () => {
    snackbar = TestBed.get(MatSnackBar);
    spyOn(snackbar, 'open');
    component.password = 'abcdefg$';
    const field = fixture.debugElement.nativeElement.querySelector('mat-form-field:nth-child(2)');
    field.click();
    expect(snackbar.open).toHaveBeenCalled();
  });
});
