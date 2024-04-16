import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DateTime } from 'luxon';

import { Activity } from '../activity';

@Component({
  selector: 'app-activity-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './activity-form.component.html',
  styleUrl: './activity-form.component.css',
})
export class ActivityFormComponent implements OnInit {
  activityForm = this.formBuilder.group({
    title: [this.activity?.title || ''],
    description: [this.activity?.description || ''],
    type: [this.activity?.type || 'Running'],
    date: [this.activity?.date || DateTime.now().toISODate()],
    startTime: [
      this.activity?.startTime ||
        DateTime.now()
          .minus({ minutes: 30 })
          .toLocaleString(DateTime.TIME_24_SIMPLE),
    ],
    endTime: [
      this.activity?.endTime ||
        DateTime.now().toLocaleString(DateTime.TIME_24_SIMPLE),
    ],
    duration: this.formBuilder.group({
      hours: [this.activity?.duration.hour || ''],
      minutes: [this.activity?.duration.minute || ''],
    }),
    barometer: [this.activity?.barometer || '3'],
  });

  @Input() formType!: string;
  formHeading: string = '';
  submitButtonLabel: string = '';

  activity?: Activity;

  activityTypeIcons: { [key: string]: string }[] = [
    { type: 'Running', icon: 'sprint' },
    { type: 'Cycling', icon: 'directions_bike' },
    { type: 'Swimming', icon: 'pool' },
    { type: 'Walking', icon: 'directions_walk' },
    { type: 'Hiking', icon: 'hiking' },
    { type: 'Other', icon: 'timer' },
  ];

  barometerIcons: { [key: string]: string }[] = [
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
  get barometerColorClass() {
    return this.barometerColor[this.activityForm.value.barometer || '3'];
  }

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.formHeading =
      this.formType === 'create' ? 'Create Activity' : 'Edit Activity';
    this.submitButtonLabel = this.formType === 'create' ? 'Create' : 'Edit';

    if (this.activityForm.get('startTime')) {
      this.activityForm.get('startTime')?.valueChanges.subscribe(startTime => {
        this.updateDuration();
      });
    }

    if (this.activityForm.get('endTime')) {
      this.activityForm.get('endTime')?.valueChanges.subscribe(endTime => {
        this.updateDuration();
      });
    }
  }

  // TODO: Correctly implement this method
  // - offset the startTime correctly in case of startTime > endTime
  updateDuration() {
    const startTime = DateTime.fromFormat(this.activityForm.value.startTime ?? '', 'HH:mm');
    const endTime = DateTime.fromFormat(this.activityForm.value.endTime ?? '', 'HH:mm');

    if (startTime.isValid && endTime.isValid) {
      const duration = endTime.diff(startTime, ['hours', 'minutes']);
      this.activityForm.get('duration')?.setValue({
        hours: duration.hours,
        minutes: duration.minutes,
      });
    }
  }

  handleSubmit(): void {
    alert('Not Implemented Yet');
  }
}
