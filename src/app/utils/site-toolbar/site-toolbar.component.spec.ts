import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteToolbarComponent } from './site-toolbar.component';

describe('SiteToolbarComponent', () => {
  let component: SiteToolbarComponent;
  let fixture: ComponentFixture<SiteToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
