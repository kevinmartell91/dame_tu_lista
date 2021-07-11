import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddToppingsComponent } from './add-toppings.component';

describe('AddToppingsComponent', () => {
  let component: AddToppingsComponent;
  let fixture: ComponentFixture<AddToppingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddToppingsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToppingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
