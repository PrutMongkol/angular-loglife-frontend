import { CommonModule, Location } from '@angular/common';
import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DateTime } from 'luxon';

import { Activity } from '../activity';
import { formatDuration } from '../shared/format-duration';

@Component({
  selector: 'app-activity-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './activity-form.component.html',
  styleUrl: './activity-form.component.css',
})
export class ActivityFormComponent implements OnInit, DoCheck {
  activityForm = this.formBuilder.nonNullable.group({
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
    duration: this.formBuilder.nonNullable.group({
      hours: [this.activity?.duration.hour || 0],
      minutes: [this.activity?.duration.minute || 0],
    }),
    barometer: [this.activity?.barometer || '3'],
  });

  oldStartTime: string | undefined;
  oldEndTime: string | undefined;

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

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
  ) {}

  formatDuration = formatDuration;

  ngOnInit() {
    this.formHeading =
      this.formType === 'create' ? 'Create Activity' : 'Edit Activity';
    this.submitButtonLabel = this.formType === 'create' ? 'Create' : 'Edit';

    this.oldStartTime = this.activityForm.value.startTime;
    this.oldEndTime = this.activityForm.value.endTime;
    this.updateDuration();
  }

  ngDoCheck() {
    if (
      this.oldStartTime !== this.activityForm.value.startTime ||
      this.oldEndTime !== this.activityForm.value.endTime
    ) {
      this.updateDuration();
      this.oldStartTime = this.activityForm.value.startTime;
      this.oldEndTime = this.activityForm.value.endTime;
    }
  }

  goBack() {
    this.location.back();
  }

  updateDuration() {
    const startTime = DateTime.fromFormat(
      this.activityForm.value.startTime ?? '',
      'HH:mm'
    );
    let endTime = DateTime.fromFormat(
      this.activityForm.value.endTime ?? '',
      'HH:mm'
    );

    if (startTime.isValid && endTime.isValid) {
      if (startTime > endTime) {
        endTime = endTime.plus({ days: 1 });
      }

      const duration = endTime.diff(startTime, ['hours', 'minutes']);

      this.activityForm.get('duration')?.setValue({
        hours: duration.hours,
        minutes: duration.minutes,
      });
    }
  }

  handleSubmit() {
    alert('Not Implemented Yet');
  }
}
