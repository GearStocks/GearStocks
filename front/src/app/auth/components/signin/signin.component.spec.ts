/* Angular Modules */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Location } from '@angular/common';
import { By } from '@angular/platform-browser';

/* App Modules */
import { SharedModule } from '../../../shared/shared.module';

/* Angular Material */
import {MatCheckboxModule, MatDialog, MatDialogModule, MatDialogRef, MatInputModule} from '@angular/material';

/* Components */
import { SigninComponent } from './signin.component';

/* Services */
import { UserService } from '../../services/user.service';

describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;
  let userService: UserService;
  let location: Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SigninComponent ],
      imports: [
        SharedModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        UserService,
        MatDialog,
        { provide: MatDialogRef, useValue: {} }
      ],
    })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninComponent);
    userService = TestBed.get(UserService);
    location = TestBed.get(Location);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.signForm.valid).toBeFalsy();
  });

  it('should contain 2 matInput', () => {
    const de = fixture.debugElement;
    const input = de.queryAll(By.css('input'));
    expect(input.length).toEqual(3);
    expect(input[0].nativeElement.value).toEqual('');
    expect(input[1].nativeElement.value).toEqual('');
  });

  it('should contain 1 mat-checkbox', () => {
    const de = fixture.debugElement;
    const checkbox = de.queryAll(By.css('mat-checkbox'));
    expect(checkbox.length).toEqual(1);
  });

  it('should contain a required input for email formControl', () => {
    let errors: {};
    const email = component.signForm.controls['email'];
    errors = email.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('should contain a required input for password formControl', () => {
    let errors: {};
    const password = component.signForm.controls['password'];
    errors = password.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('should set error to true if form is invalid', function () {
    const de = fixture.debugElement;
    component.signForm.get('email').setValue(null);
    component.signForm.get('password').setValue(null);
    de.nativeElement.querySelector('.loginButton').click();
    expect(component.error).toBe(true);
  });

  it('should call reset password method on click', function () {
    const de = fixture.debugElement;
    const spy = spyOn(component, 'resetPassword');
    de.nativeElement.querySelector('.forgotPassword').click();
    expect(spy).toHaveBeenCalled();
  });
});
