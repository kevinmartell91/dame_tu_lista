import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderHistoryComponent } from './order-history.component';

describe('OrderHistoryComponent', () => {
  let component: OrderHistoryComponent;
  let fixture: ComponentFixture<OrderHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrderHistoryComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
