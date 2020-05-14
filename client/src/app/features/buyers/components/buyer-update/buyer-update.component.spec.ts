import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerUpdateComponent } from './buyer-update.component';

describe('BuyerUpdateComponent', () => {
  let component: BuyerUpdateComponent;
  let fixture: ComponentFixture<BuyerUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyerUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
