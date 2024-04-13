import { Routes } from '@angular/router';

import { LandingPageComponent } from './landing-page/landing-page.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ActivityListComponent } from './activity-list/activity-list.component';
import { ActivityDetailsComponent } from './activity-details/activity-details.component';
import { ActivityCreateComponent } from './activity-create/activity-create.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'activities', component: ActivityListComponent },
  { path: 'activities/create', component: ActivityCreateComponent},
  { path: 'activities/:id', component: ActivityDetailsComponent},
];
