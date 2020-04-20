import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GearstocksTextareaComponent } from './gearstocks-textarea.component';

describe('GearstocksTextareaComponent', () => {
  let component: GearstocksTextareaComponent;
  let fixture: ComponentFixture<GearstocksTextareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GearstocksTextareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GearstocksTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
