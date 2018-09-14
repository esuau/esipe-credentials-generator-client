import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppRoutingModule } from '../../app.routing';
import { EmailComponent } from './email.component';
import { PasswordComponent } from '../password/password.component';

import { UserService } from '../../services/user.service';

describe('EmailComponent', () => {
  let component: EmailComponent;
  let fixture: ComponentFixture<EmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EmailComponent,
        PasswordComponent
      ],
      imports: [
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
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
    fixture = TestBed.createComponent(EmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display an `Email` input', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('input').getAttribute('placeholder')).toEqual('Email');
  });

  it('should have email field valid with UPEC address', () => {
    component.infoForm.get('email').setValue('email@u-pec.fr');
    expect(component.infoForm.get('email').valid).toEqual(true);
    component.infoForm.get('email').setValue('email@etu.u-pec.fr');
    expect(component.infoForm.get('email').valid).toEqual(true);
  });

  it('should have email field invalid with non-UPEC address', () => {
    component.infoForm.get('email').setValue('email@domain.com');
    expect(component.infoForm.get('email').valid).toEqual(false);
  });

  it('should disable `CONTINUE` button when email is invalid', () => {
    component.infoForm.get('email').setValue('email@domain.com');
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('button').disabled).toBe(true);
  });

  it('should display a select input for level', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-select').getAttribute('placeholder')).toEqual('Level');
  });

  it('should have the level input required', () => {
    component.infoForm.get('level').setValue(null);
    expect(component.infoForm.get('level').valid).toBe(false);
    component.infoForm.get('level').setValue({ text: 'ING1', value: 'I1' });
    expect(component.infoForm.get('level').valid).toBe(true);
  });

  it('should disable `CONTINUE` button when level is not selected', () => {
    component.infoForm.get('level').setValue(null);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('button').disabled).toBe(true);
  });

  it('should have invalid FormGroup when email value is incorrect', () => {
    component.infoForm.setValue({
      email: 'email@domain.com',
      level: { text: 'ING1', value: 'I1' }
    });
    fixture.detectChanges();
    expect(component.infoForm.valid).toBe(false);
  });

  it('should have invalid FormGroup when level value is null', () => {
    component.infoForm.setValue({
      email: 'email@u-pec.fr',
      level: null
    });
    fixture.detectChanges();
    expect(component.infoForm.valid).toBe(false);
  });

  it('should have valid form when inputs are correct', () => {
    component.infoForm.setValue({
      email: 'email@u-pec.fr',
      level: { text: 'ING1', value: 'I1' }
    });
    fixture.detectChanges();
    expect(component.infoForm.valid).toBe(true);
  });

  it('should enable `CONTINUE` button when form is valid', () => {
    component.infoForm.setValue({
      email: 'email@u-pec.fr',
      level: { text: 'ING1', value: 'I1' }
    });
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('button').disabled).toBe(false);
  });

  it('should prevent navigation to PasswordComponent when button `CONTINUE` while form data is incorrect', () => {
    component.infoForm.setValue({
      email: null,
      level: {}
    });
    fixture.detectChanges();
    spyOn(component, 'navigateToPassword');
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    expect(component.navigateToPassword).not.toHaveBeenCalled();
  });

  it('should navigate to PasswordComponent when button `CONTINUE` is clicked', () => {
    component.infoForm.setValue({
      email: 'email@u-pec.fr',
      level: { text: 'ING1', value: 'I1' }
    });
    fixture.detectChanges();
    spyOn(component, 'navigateToPassword');
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    expect(component.navigateToPassword).toHaveBeenCalled();
  });
});
