import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthService } from '../auth.service';
import { ActivityAddButtonComponent } from '../activity-add-button/activity-add-button.component';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [ActivityAddButtonComponent, RouterModule],
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
