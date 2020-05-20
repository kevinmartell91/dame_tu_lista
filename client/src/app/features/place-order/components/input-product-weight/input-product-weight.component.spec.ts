import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputProductWeightComponent } from './input-product-weight.component';

describe('InputProductWeightComponent', () => {
  let component: InputProductWeightComponent;
  let fixture: ComponentFixture<InputProductWeightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputProductWeightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputProductWeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
