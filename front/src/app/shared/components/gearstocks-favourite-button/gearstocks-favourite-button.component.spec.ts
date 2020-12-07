import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GearstocksFavouriteButtonComponent } from './gearstocks-favourite-button.component';

describe('GearstocksFavouriteButtonComponent', () => {
  let component: GearstocksFavouriteButtonComponent;
  let fixture: ComponentFixture<GearstocksFavouriteButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GearstocksFavouriteButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GearstocksFavouriteButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
