import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityAddButtonComponent } from './activity-add-button.component';

describe('ActivityAddButtonComponent', () => {
  let component: ActivityAddButtonComponent;
  let fixture: ComponentFixture<ActivityAddButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityAddButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActivityAddButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
