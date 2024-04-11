import { Component } from '@angular/core';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [],
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
