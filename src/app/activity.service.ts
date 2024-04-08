import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Activity } from './activity';
import { ACTIVITIES } from '../mock-data';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  constructor() {}

  getActivities(type?: string): Observable<Activity[]> {
    console.log('ActivityService.getActivities', type);

    const activities = of(
      type
        ? ACTIVITIES.filter((activity) => activity.type === type)
        : ACTIVITIES
    );
    return activities;
  }
}
