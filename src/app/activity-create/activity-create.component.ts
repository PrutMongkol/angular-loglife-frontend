import { Component } from '@angular/core';
import { LayoutComponent } from '../layout/layout.component';
import { ActivityFormComponent } from '../activity-form/activity-form.component';

@Component({
  selector: 'app-activity-create',
  standalone: true,
  imports: [LayoutComponent, ActivityFormComponent],
  templateUrl: './activity-create.component.html',
})
export class ActivityCreateComponent {

}
