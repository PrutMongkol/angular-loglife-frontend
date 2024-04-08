import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityGroupSelectorComponent } from './activity-group-selector.component';

describe('ActivityGroupSelectorComponent', () => {
  let component: ActivityGroupSelectorComponent;
  let fixture: ComponentFixture<ActivityGroupSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityGroupSelectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActivityGroupSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
