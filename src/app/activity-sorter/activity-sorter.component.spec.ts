import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitySorterComponent } from './activity-sorter.component';

describe('ActivitySorterComponent', () => {
  let component: ActivitySorterComponent;
  let fixture: ComponentFixture<ActivitySorterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivitySorterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActivitySorterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
