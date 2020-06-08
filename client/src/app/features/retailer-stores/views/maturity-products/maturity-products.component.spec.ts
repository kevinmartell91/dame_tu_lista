import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaturityProductsComponent } from './maturity-products.component';

describe('MaturityProductsComponent', () => {
  let component: MaturityProductsComponent;
  let fixture: ComponentFixture<MaturityProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaturityProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaturityProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
