import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Activity } from '../activity';
import { formatDuration } from '../shared/format-duration';

@Component({
  selector: 'app-listed-card',
  standalone: true,
  imports: [],
  templateUrl: './listed-card.component.html',
  styleUrl: './listed-card.component.css',
})
export class ListedCardComponent implements OnInit {
  @Input() activity!: Activity;
  moodColor: string = '';
  activitySymbol: string = '';

  constructor(private router: Router) {}

  moodMap: { [key: string]: string } = {
    '1': 'bg-info',
    '2': 'bg-success',
    '3': 'bg-warning',
    '4': 'bg-error',
    '5': 'bg-power',
  };

  activitySymbolMap: { [key: string]: string } = {
    Running: 'sprint',
    Cycling: 'directions_bike',
    Swimming: 'pool',
    Walking: 'directions_walk',
    Hiking: 'hiking',
    Other: 'timer',
  };

  ngOnInit() {
    this.moodColor = this.moodMap[this.activity.barometer];
    this.activitySymbol = this.activitySymbolMap[this.activity.type];
  }

  formatDuration = formatDuration;

  handleShowDetails(id: any) {
    // this.router.navigate([`/activities/${id}`]);
    alert('Not Implemented');
  }

  handleEdit(id: any) {
    // this.router.navigate([`/activities/edit/${id}`]);
    alert('Not Implemented');
  }
}
