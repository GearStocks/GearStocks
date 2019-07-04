/* Angular Modules */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

/* Material Angular */
import { MatDialog } from '@angular/material';

/* App Modules */
import { SharedModule } from '../../../shared/shared.module';

/* Components */
import { SignupComponent } from './signup.component';

/* Services */
import { UserService } from '../../services/user.service';
import {By} from '@angular/platform-browser';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let userService: UserService;
  let dialog: MatDialog;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupComponent ],
      imports: [
        SharedModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        UserService,
        MatDialog
      ]
    })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    dialog = TestBed.get(MatDialog);
    userService = TestBed.get(UserService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.signForm.valid).toBeFalsy();
  });

  it('should contain 6 input', () => {
    const de = fixture.debugElement;
    const input = de.queryAll(By.css('input'));
    expect(input.length).toEqual(6);
  });

  it('should contain a captcha', () => {
    const de = fixture.debugElement;
    const captcha = de.queryAll(By.css('ngx-recaptcha2'));
    expect(captcha.length).toEqual(1);
  });

  it('should contain a required input for firstName formControl', () => {
    let errors: {};
    const email = component.signForm.controls['firstName'];
    errors = email.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('should contain a required input for lastName formControl', () => {
    let errors: {};
    const email = component.signForm.controls['lastName'];
    errors = email.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('should contain a required input for email formControl', () => {
    let errors: {};
    const email = component.signForm.controls['email'];
    errors = email.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('should contain a required input for userName formControl', () => {
    let errors: {};
    const email = component.signForm.controls['username'];
    errors = email.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('should contain a required input for password formControl', () => {
    let errors: {};
    const email = component.signForm.controls['password'];
    errors = email.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('should contain a required input for confirmPassword formControl', () => {
    let errors: {};
    const email = component.signForm.controls['confirmPassword'];
    errors = email.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('should contain a required input for recaptcha formControl', () => {
    let errors: {};
    const email = component.signForm.controls['recaptcha'];
    errors = email.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('should set error to true if form is invalid', function () {
    const de = fixture.debugElement;
    component.signForm.get('email').setValue(null);
    component.signForm.get('password').setValue(null);
    de.nativeElement.querySelector('.loginButton').click();
    expect(component.error).toBe(true);
  });
});
