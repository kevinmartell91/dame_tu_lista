import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterRetailerComponent } from './register-retailer.component';

describe('RegisterRetailerComponent', () => {
  let component: RegisterRetailerComponent;
  let fixture: ComponentFixture<RegisterRetailerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterRetailerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterRetailerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
