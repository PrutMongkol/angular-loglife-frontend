import { Component } from '@angular/core';

import { AuthService } from '../auth.service';
import { ActivityAddButtonComponent } from '../activity-add-button/activity-add-button.component';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [ActivityAddButtonComponent],
  templateUrl: './nav.component.html',
})
export class NavComponent {
  isLoggedIn: boolean;
  username: string;

  constructor(private authService: AuthService) {
    this.isLoggedIn = authService.isAuthenticated;
    this.username = authService.username || 'Guest';
  }
}
