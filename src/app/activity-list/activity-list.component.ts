import { Component } from '@angular/core';
import { LayoutComponent } from '../layout/layout.component';
import { ListedCardComponent } from '../listed-card/listed-card.component';

@Component({
  selector: 'app-activity-list',
  standalone: true,
  imports: [LayoutComponent, ListedCardComponent],
  templateUrl: './activity-list.component.html',
})
export class ActivityListComponent {}
