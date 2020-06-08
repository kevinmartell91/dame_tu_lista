import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VarietyProductsComponent } from './variety-products.component';

describe('VarietyProductsComponent', () => {
  let component: VarietyProductsComponent;
  let fixture: ComponentFixture<VarietyProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VarietyProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VarietyProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
