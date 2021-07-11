import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RowProductViewComponent } from './row-product-view.component';

describe('RowProductViewComponent', () => {
  let component: RowProductViewComponent;
  let fixture: ComponentFixture<RowProductViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RowProductViewComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RowProductViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
