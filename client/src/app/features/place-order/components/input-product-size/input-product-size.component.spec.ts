import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputProductSizeComponent } from './input-product-size.component';

describe('InputProductSizeComponent', () => {
  let component: InputProductSizeComponent;
  let fixture: ComponentFixture<InputProductSizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputProductSizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputProductSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
