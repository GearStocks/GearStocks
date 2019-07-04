/* Angular Modules */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

/* Components */
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ]
    })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should scroll down on click', function () {
    const de = fixture.debugElement;
    const button = de.nativeElement.querySelector('.ca3-scroll-down-link');
    const spy = spyOn(component, 'scrollTo');
    button.click();
    expect(spy).toHaveBeenCalled();
  });
});
