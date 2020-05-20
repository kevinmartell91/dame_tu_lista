import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputProductQuantityComponent } from './input-product-quantity.component';

describe('InputProductQuantityComponent', () => {
  let component: InputProductQuantityComponent;
  let fixture: ComponentFixture<InputProductQuantityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputProductQuantityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputProductQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
