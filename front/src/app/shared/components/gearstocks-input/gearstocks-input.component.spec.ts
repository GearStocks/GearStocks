import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GearstocksInputComponent } from './gearstocks-input.component';

xdescribe('GearstocksInputComponent', () => {
  let component: GearstocksInputComponent;
  let fixture: ComponentFixture<GearstocksInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GearstocksInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GearstocksInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
