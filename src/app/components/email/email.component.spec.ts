import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

import { AppRoutingModule } from '../../app.routing';

import { EmailComponent } from './email.component';
import { PasswordComponent } from '../password/password.component';

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
        MatInputModule,
        ReactiveFormsModule
      ]
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

  it('should have email field valid with UPEC address', () => {
    component.emailFormControl.setValue('email@u-pec.fr');
    expect(component.emailFormControl.valid).toEqual(true);
    component.emailFormControl.setValue('email@etu.u-pec.fr');
    expect(component.emailFormControl.valid).toEqual(true);
  });

  it('should have email field invalid with non-UPEC address', () => {
    component.emailFormControl.setValue('email@domain.com');
    expect(component.emailFormControl.valid).toEqual(false);
  });
});
