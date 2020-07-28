import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCommentModalComponent } from './product-comment-modal.component';

describe('ProductCommentModalComponent', () => {
  let component: ProductCommentModalComponent;
  let fixture: ComponentFixture<ProductCommentModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCommentModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCommentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
