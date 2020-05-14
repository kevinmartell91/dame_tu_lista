import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerViewComponent } from './buyer-view.component';

describe('BuyerViewComponent', () => {
  let component: BuyerViewComponent;
  let fixture: ComponentFixture<BuyerViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyerViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
