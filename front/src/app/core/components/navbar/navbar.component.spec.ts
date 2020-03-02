/* Angular Modules */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

/* Material Angular */
import { MatDialog } from '@angular/material/dialog';

/* Components */
import { NavbarComponent } from './navbar.component';

/* Services */
import { UserService } from '../../../auth/services/user.service';

/* App modules */
import { SharedModule } from '../../../shared/shared.module';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let userService: UserService;
  let location: Location;
  let router: Router;
  let dialog: MatDialog;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarComponent ],
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        SharedModule
      ],
      providers: [ UserService ]
    })
        .compileComponents();
  }));

  beforeEach(() => {
    userService = TestBed.get(UserService);
    location = TestBed.get(Location);
    router = TestBed.get(Router);
    dialog = TestBed.get(MatDialog);
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a login button if the user is not authenticated', () => {
    const de = fixture.debugElement;
    const loginSection = de.nativeElement.querySelector('#login');
    const logoutSection = de.nativeElement.querySelector('#logout');
    expect(loginSection).not.toBeNull();
    expect(logoutSection).toBeNull();
  });

  it('should open login modal on click on the login button', () => {
    const de = fixture.debugElement;
    const button = de.nativeElement.querySelector('#login');
    const spy = spyOn(component, 'open');
    button.click();
    fixture.whenStable().then(() => {
      expect(spy).toHaveBeenCalled();
    });
  });

  it('should have a logout button if the user is authenticated', () => {
    component.currentUser = {
      id: 1,
      username: 'testName',
      password: 'testPassword',
      firstName: 'test',
      lastName: 'test',
      email: 'testEmail',
      token: '',
    };
    fixture.detectChanges();
    const de = fixture.debugElement;
    const loginSection = de.nativeElement.querySelector('#login');
    const logoutSection = de.nativeElement.querySelector('#logout');
    expect(loginSection).toBeNull();
    expect(logoutSection).not.toBeNull();
  });

  it('should trigger logout service method when click on the logout button', () => {
    component.currentUser = {
      id: 1,
      username: 'testName',
      password: 'testPassword',
      firstName: 'test',
      lastName: 'test',
      email: 'testEmail',
      token: '',
    };
    fixture.detectChanges();
    const de = fixture.debugElement;
    const button = de.nativeElement.querySelector('#logout');
    const spy = spyOn(userService, 'logout');
    button.click();
    expect(spy).toHaveBeenCalled();
  });

});
