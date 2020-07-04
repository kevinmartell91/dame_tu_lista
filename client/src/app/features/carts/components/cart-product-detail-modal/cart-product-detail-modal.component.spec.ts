import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartProductDetailModalComponent } from './cart-product-detail-modal.component';

describe('CartProductDetailModalComponent', () => {
  let component: CartProductDetailModalComponent;
  let fixture: ComponentFixture<CartProductDetailModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartProductDetailModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartProductDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
