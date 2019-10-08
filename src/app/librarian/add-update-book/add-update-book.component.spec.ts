import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateBookComponent } from './add-update-book.component';

describe('AddUpdateBookComponent', () => {
  let component: AddUpdateBookComponent;
  let fixture: ComponentFixture<AddUpdateBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUpdateBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
