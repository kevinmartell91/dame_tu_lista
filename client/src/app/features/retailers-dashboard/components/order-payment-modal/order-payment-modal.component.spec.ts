import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderPaymentModalComponent } from './order-payment-modal.component';

describe('OrderPaymentModalComponent', () => {
  let component: OrderPaymentModalComponent;
  let fixture: ComponentFixture<OrderPaymentModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrderPaymentModalComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderPaymentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
