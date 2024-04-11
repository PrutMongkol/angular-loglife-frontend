import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DateTime } from 'luxon';

import { Activity } from '../activity';
import { LayoutComponent } from '../layout/layout.component';
import { ActivityService } from '../activity.service';

@Component({
  selector: 'app-activity-details',
  standalone: true,
  imports: [LayoutComponent],
  templateUrl: './activity-details.component.html',
  styleUrl: './activity-details.component.css',
})
export class ActivityDetailsComponent implements OnInit {
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
  barometerImaegUrl: string;

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
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.barometerColorClass = this.activity?.barometer
      ? this.barometerColors[this.activity.barometer]
      : '1';
    this.barometerImaegUrl = this.activity?.barometer
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

  goBack(): void {
    this.location.back();
  }

  getActivity(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    if (id === '') {
      this.goBack();
      return;
    }
    this.activityService.getActivityById(id).subscribe((activity) => {
      this.activity = activity;
    });
  }
}
