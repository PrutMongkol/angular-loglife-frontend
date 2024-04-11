import { Component, OnChanges, OnInit } from '@angular/core';

import { Activity } from '../activity';
import { ActivityService } from './../activity.service';

import { LayoutComponent } from '../layout/layout.component';
import { ListedCardComponent } from '../listed-card/listed-card.component';
import { NgFor } from '@angular/common';
import { ActivityGroupSelectorComponent } from '../activity-group-selector/activity-group-selector.component';
import { ActivitySorterComponent } from '../activity-sorter/activity-sorter.component';

@Component({
  selector: 'app-activity-list',
  standalone: true,
  imports: [
    LayoutComponent,
    ListedCardComponent,
    ActivityGroupSelectorComponent,
    ActivitySorterComponent,
    NgFor,
  ],
  templateUrl: './activity-list.component.html',
})
export class ActivityListComponent implements OnInit {
  activities: Activity[] = [];
  selectedGroup = 'All';
  selectedSort = 'Newest First';

  constructor(private activityService: ActivityService) {}

  ngOnInit(): void {
    this.getActivities(this.selectedGroup, this.selectedSort);
  }

  onSelectedGroupChange(type: string): void {
    this.selectedGroup = type;
    this.getActivities(type, this.selectedSort);
  }

  onSelectedSortChange(sort: string): void {
    this.selectedSort = sort;
    this.getActivities(this.selectedGroup, sort);
  }

  getActivities(type?: string, sort?: string): void {
    const typeFilter = type === 'All' ? undefined : type;
    const sortOption = sort === 'Newest First' ? 'date-desc' : 'date-asc';
    this.activityService
      .getActivities(typeFilter, sortOption)
      .subscribe((activities) => (this.activities = activities));
  }
}
