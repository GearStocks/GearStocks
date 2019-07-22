/* Angular Modules */
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

/* App Modules */
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';

/* Components */
import { AppComponent } from './app.component';

/* Directive */
import { RouterOutlet } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        CoreModule,
        AuthModule,
        RouterTestingModule,
        BrowserAnimationsModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have a router-outlet directive`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const debugEl = fixture.debugElement.query(By.directive(RouterOutlet));
    expect(debugEl).not.toBeNull();
  });

  it('should have navbar tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-navbar')).not.toBeNull();
  });

  it('should have navbar-list tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-sidenav-list')).not.toBeNull();
  });

  it('should have footer tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-footer')).not.toBeNull();
  });
});
