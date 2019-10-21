import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GearstocksSelectComponent } from './gearstocks-select.component';

xdescribe('GearstocksSelectComponent', () => {
  let component: GearstocksSelectComponent;
  let fixture: ComponentFixture<GearstocksSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GearstocksSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GearstocksSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
