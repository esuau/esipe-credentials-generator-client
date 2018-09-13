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

import { AppRoutingModule } from '../../app.routing';
import { EmailComponent } from '../email/email.component';
import { PasswordComponent } from './password.component';
import { UserService } from '../../services/user.service';

describe('PasswordComponent', () => {
  let component: PasswordComponent;
  let fixture: ComponentFixture<PasswordComponent>;
  let service: UserService;

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
});
