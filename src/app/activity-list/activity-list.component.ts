import { Component, OnInit } from '@angular/core';

import { Activity } from '../activity';
import { ActivityService } from './../activity.service';

import { LayoutComponent } from '../layout/layout.component';
import { ListedCardComponent } from '../listed-card/listed-card.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-activity-list',
  standalone: true,
  imports: [LayoutComponent, ListedCardComponent, NgFor],
  templateUrl: './activity-list.component.html',
})
export class ActivityListComponent implements OnInit {
  activities: Activity[] = [];

  constructor(private activityService: ActivityService) {}

  ngOnInit(): void {
    this.getActivities();
  }

  getActivities(): void {
    this.activityService.getActivities()
      .subscribe(activities => this.activities = activities);
  }
}
