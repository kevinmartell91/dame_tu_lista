import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThanksOrderComponent } from './thanks-order.component';

describe('ThanksOrderComponent', () => {
  let component: ThanksOrderComponent;
  let fixture: ComponentFixture<ThanksOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThanksOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThanksOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
