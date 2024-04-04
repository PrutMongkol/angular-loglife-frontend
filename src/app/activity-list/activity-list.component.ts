import { Component } from '@angular/core';
import { LayoutComponent } from '../layout/layout.component';

@Component({
  selector: 'app-activity-list',
  standalone: true,
  imports: [LayoutComponent],
  templateUrl: './activity-list.component.html',
})
export class ActivityListComponent {}
