import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputProductLastForComponent } from './input-product-last-for.component';

describe('InputProductLastForComponent', () => {
  let component: InputProductLastForComponent;
  let fixture: ComponentFixture<InputProductLastForComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputProductLastForComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputProductLastForComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
