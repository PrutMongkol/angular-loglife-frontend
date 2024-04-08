import { Component, OnChanges, OnInit } from '@angular/core';

import { Activity } from '../activity';
import { ActivityService } from './../activity.service';

import { LayoutComponent } from '../layout/layout.component';
import { ListedCardComponent } from '../listed-card/listed-card.component';
import { NgFor } from '@angular/common';
import { ActivityGroupSelectorComponent } from '../activity-group-selector/activity-group-selector.component';

@Component({
  selector: 'app-activity-list',
  standalone: true,
  imports: [
    LayoutComponent,
    ListedCardComponent,
    ActivityGroupSelectorComponent,
    NgFor,
  ],
  templateUrl: './activity-list.component.html',
})
export class ActivityListComponent implements OnInit {
  activities: Activity[] = [];
  selectedGroup = 'All';

  constructor(private activityService: ActivityService) {}

  ngOnInit(): void {
    this.getActivities(this.selectedGroup);
  }

  onSelectedGroupChange(group: string): void {
    this.selectedGroup = group;
    this.getActivities(group);
  }

  getActivities(type?: string): void {
    const filter = type === 'All' ? undefined : type;
    this.activityService
      .getActivities(filter)
      .subscribe((activities) => (this.activities = activities));
  }
}
