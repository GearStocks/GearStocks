import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GearstocksAlertComponent } from './gearstocks-alert.component';

describe('GearstocksAlertComponent', () => {
  let component: GearstocksAlertComponent;
  let fixture: ComponentFixture<GearstocksAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GearstocksAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GearstocksAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
