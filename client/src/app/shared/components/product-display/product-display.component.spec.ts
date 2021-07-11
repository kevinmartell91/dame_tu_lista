import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductDisplaySharedComponent } from './product-display.component';

describe('ProductDisplaySharedComponent', () => {
  let component: ProductDisplaySharedComponent;
  let fixture: ComponentFixture<ProductDisplaySharedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductDisplaySharedComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDisplaySharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
