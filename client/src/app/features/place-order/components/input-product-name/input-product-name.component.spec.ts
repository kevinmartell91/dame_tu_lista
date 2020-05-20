import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputProductNameComponent } from './input-product-name.component';

describe('InputProductNameComponent', () => {
  let component: InputProductNameComponent;
  let fixture: ComponentFixture<InputProductNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputProductNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputProductNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
