import { Component } from '@angular/core';
import { LayoutComponent } from '../layout/layout.component';
import { ActivatedRoute } from '@angular/router';

import { ActivityFormComponent } from '../activity-form/activity-form.component';

@Component({
  selector: 'app-activity-edit',
  standalone: true,
  imports: [LayoutComponent, ActivityFormComponent],
  templateUrl: './activity-edit.component.html',
})
export class ActivityEditComponent {
  activityId = this.route.snapshot.paramMap.get('id') || undefined;

  constructor(
    private route: ActivatedRoute
  ) {}
}
