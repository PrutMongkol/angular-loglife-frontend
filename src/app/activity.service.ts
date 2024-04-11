import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { Activity } from './activity';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  constructor(private http: HttpClient) {}

  getActivities(
    type = '',
    sort = '',
    skip = '',
    take = ''
  ): Observable<Activity[]> {
    return this.http.get<Activity[]>(
      environment.apiUrl +
        '/activities/user/me' +
        `?type=${type}&sort=${sort}&skip=${skip}&take=${take}`
    );
  }

  getActivityById(id: string): Observable<Activity> {
    return this.http.get<Activity>(environment.apiUrl + '/activities/' + id);
  }
}
