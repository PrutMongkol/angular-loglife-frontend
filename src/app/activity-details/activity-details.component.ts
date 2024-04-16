import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DateTime } from 'luxon';

import { Activity } from '../activity';
import { LayoutComponent } from '../layout/layout.component';
import { ActivityService } from '../activity.service';
import { formatDuration } from '../shared/format-duration';

@Component({
  selector: 'app-activity-details',
  standalone: true,
  imports: [LayoutComponent, CommonModule],
  templateUrl: './activity-details.component.html',
  styleUrl: './activity-details.component.css',
})
export class ActivityDetailsComponent implements OnInit {
  @ViewChild('delete_modal') delete_modal?: ElementRef;
  activity?: Activity;

  barometerColors: { [key: string]: string } = {
    1: 'bg-info',
    2: 'bg-success',
    3: 'bg-warning',
    4: 'bg-error',
    5: 'bg-power',
  };
  barometerColorClass: string;

  barometerImages: { [key: string]: string } = {
    1: '../assets/baro_1.png',
    2: '../assets/baro_2.png',
    3: '../assets/baro_3.png',
    4: '../assets/baro_4.png',
    5: '../assets/baro_5.png',
  };
  barometerImageUrl: string;

  barometerIcons: { [key: string]: string } = {
    1: 'sentiment_very_dissatisfied',
    2: 'sentiment_stressed',
    3: 'sentiment_neutral',
    4: 'sentiment_content',
    5: 'sentiment_very_satisfied',
  };
  barometerIconMaterial: string;

  barometerTexts: { [key: string]: string } = {
    1: 'Very Weak',
    2: 'Weak',
    3: 'Normal',
    4: 'Strong',
    5: 'Very Strong',
  };
  barometerText: string;

  materialIcons: { [key: string]: string } = {
    Running: 'sprint',
    Cycling: 'directions_bike',
    Swimming: 'pool',
    Walking: 'directions_walk',
    Hiking: 'hiking',
    Other: 'timer',
  };

  dt: string;

  constructor(
    private activityService: ActivityService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.barometerColorClass = this.activity?.barometer
      ? this.barometerColors[this.activity.barometer]
      : '1';
    this.barometerImageUrl = this.activity?.barometer
      ? this.barometerImages[this.activity.barometer]
      : '../assets/baro_1.png';
    this.barometerIconMaterial = this.activity?.barometer
      ? this.barometerIcons[this.activity.barometer]
      : 'sentiment_very_dissatisfied';
    this.barometerText = this.activity?.barometer
      ? this.barometerTexts[this.activity.barometer]
      : 'Very Weak';
    this.dt = this.activity?.date
      ? DateTime.fromISO(this.activity.date).toLocaleString(DateTime.DATE_HUGE)
      : '';
  }

  ngOnInit(): void {
    this.getActivity();
  }

  formatDuration = formatDuration;

  goToActivities(): void {
    this.router.navigate(['/activities']);
  }

  getActivity(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    if (id === '') {
      this.goToActivities();
      return;
    }
    this.activityService.getActivityById(id).subscribe((activity) => {
      this.activity = activity;
      this.barometerColorClass = this.activity?.barometer
        ? this.barometerColors[this.activity.barometer]
        : '1';
      this.barometerImageUrl = this.activity?.barometer
        ? this.barometerImages[this.activity.barometer]
        : '../assets/baro_1.png';
      this.barometerIconMaterial = this.activity?.barometer
        ? this.barometerIcons[this.activity.barometer]
        : 'sentiment_very_dissatisfied';
      this.barometerText = this.activity?.barometer
        ? this.barometerTexts[this.activity.barometer]
        : 'Very Weak';
      this.dt = this.activity?.date
        ? DateTime.fromISO(this.activity.date).toLocaleString(
            DateTime.DATE_HUGE
          )
        : '';
    });
  }

  handleEdit(): void {
    this.router.navigate([`/activities/edit/${this.activity?.activityId}`]);
  }

  handleDelete(): void {
    this.activityService
      .deleteActivity(this.activity!.activityId!)
      .subscribe(() => {
        this.goToActivities();
      });
  }
}
