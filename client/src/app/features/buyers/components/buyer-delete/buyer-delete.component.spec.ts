import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerDeleteComponent } from './buyer-delete.component';

describe('BuyerDeleteComponent', () => {
  let component: BuyerDeleteComponent;
  let fixture: ComponentFixture<BuyerDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyerDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
