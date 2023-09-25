import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreVisitedComponent } from './more-visited.component';

describe('MoreVisitedComponent', () => {
  let component: MoreVisitedComponent;
  let fixture: ComponentFixture<MoreVisitedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MoreVisitedComponent]
    });
    fixture = TestBed.createComponent(MoreVisitedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
