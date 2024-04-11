import { Component } from '@angular/core';
import { LayoutComponent } from '../layout/layout.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [LayoutComponent, RouterModule],
  templateUrl: './landing-page.component.html',
})
export class LandingPageComponent {

}
