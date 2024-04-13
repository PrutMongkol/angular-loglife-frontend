import { Component } from '@angular/core';

import { Activity } from '../activity';

@Component({
  selector: 'app-activity-form',
  standalone: true,
  imports: [],
  templateUrl: './activity-form.component.html',
  styleUrl: './activity-form.component.css',
})
export class ActivityFormComponent {
  formHeading = 'Create Activity';
  activity?: Activity;

  barometerColor: { [key: string]: string } = {
    1: 'bg-info',
    2: 'bg-success',
    3: 'bg-warning',
    4: 'bg-error',
    5: 'bg-power',
  };
  barometerColorClass: string;

  constructor() {
    this.barometerColorClass = this.barometerColor[this.activity?.barometer || "1"];
  }

  handleSubmit(): void {
    alert("Not Implemented Yet")
  }
}
