import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FillShippingAddressComponent } from './fill-shipping-address.component';

describe('FillShippingAddressComponent', () => {
  let component: FillShippingAddressComponent;
  let fixture: ComponentFixture<FillShippingAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FillShippingAddressComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FillShippingAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
