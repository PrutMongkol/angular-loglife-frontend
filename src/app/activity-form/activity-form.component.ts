import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { Activity } from '../activity';

@Component({
  selector: 'app-activity-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './activity-form.component.html',
  styleUrl: './activity-form.component.css',
})
export class ActivityFormComponent {
  activityForm = this.formBuilder.group({
    title: [this.activity?.title || ''],
    description: [this.activity?.description || ''],
    type: [this.activity?.type || 'Running'],
    date: [this.activity?.date || ''],
    startTime: [this.activity?.startTime || ''],
    endTime: [this.activity?.endTime || ''],
    duration: this.formBuilder.group({
      hours: [this.activity?.duration.hour || ''],
      minutes: [this.activity?.duration.minute || ''],
    }),
    barometer: [this.activity?.barometer || '3'],
  });

  formHeading?: string = 'Create Activity';
  submitButtonLabel?: string = 'Create';

  activity?: Activity;

  activityTypeIcons: {[key: string]: string}[] = [
    { type: 'Running', icon: 'sprint' },
    { type: 'Cycling', icon: 'directions_bike' },
    { type: 'Swimming', icon: 'pool' },
    { type: 'Walking', icon: 'directions_walk' },
    { type: 'Hiking', icon: 'hiking' },
    { type: 'Other', icon: 'timer' },
  ];

  barometerIcons: {[key: string]: string}[] = [
    { value: '1', icon: 'sentiment_very_dissatisfied', label: 'Very Weak' },
    { value: '2', icon: 'sentiment_dissatisfied', label: 'Weak' },
    { value: '3', icon: 'sentiment_neutral', label: 'Normal' },
    { value: '4', icon: 'sentiment_satisfied', label: 'Strong' },
    { value: '5', icon: 'sentiment_very_satisfied', label: 'Very Strong' },
  ];

  barometerColor: { [key: string]: string } = {
    1: 'bg-info',
    2: 'bg-success',
    3: 'bg-warning',
    4: 'bg-error',
    5: 'bg-power',
  };
  barometerColorClass: string;

  constructor(private formBuilder: FormBuilder) {
    this.barometerColorClass =
      this.barometerColor[this.activity?.barometer || '1'];
  }

  handleSubmit(): void {
    alert('Not Implemented Yet');
  }
}
