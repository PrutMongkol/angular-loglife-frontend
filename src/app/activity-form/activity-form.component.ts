import { CommonModule, Location } from '@angular/common';
import {
  Component,
  DoCheck,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { DateTime } from 'luxon';

import { Activity } from '../activity';
import { formatDuration } from '../shared/format-duration';
import { ActivityService } from '../activity.service';
import { Router } from '@angular/router';

// a validator function to check if the start time is equal the end time
function endTimeValidator(startTime: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value === startTime) {
      return { endTimeEqualStartTime: true };
    }
    return null;
  };
}

@Component({
  selector: 'app-activity-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './activity-form.component.html',
})
export class ActivityFormComponent implements OnChanges, OnInit, DoCheck {
  activityForm = this.formBuilder.nonNullable.group({
    title: [''],
    description: [''],
    type: ['Running'],
    date: [DateTime.now().toISODate(), Validators.required],
    startTime: [
      DateTime.now()
        .minus({ minutes: 30 })
        .toLocaleString(DateTime.TIME_24_SIMPLE),
      Validators.required,
    ],
    endTime: [
      DateTime.now().toLocaleString(DateTime.TIME_24_SIMPLE),
      [Validators.required],
    ],
    duration: this.formBuilder.nonNullable.group({
      hours: [0],
      minutes: [30],
    }),
    barometer: ['3'],
  });

  oldStartTime: string | undefined;
  oldEndTime: string | undefined;

  @Input() formType!: string;
  @Input() activityId?: string;
  activity?: Activity;

  formHeading: string = '';
  submitButtonLabel: string = '';

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
    private router: Router,
    private activityService: ActivityService
  ) {}

  formatDuration = formatDuration;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['activityId']) {
      this.activityService
        .getActivityById(this.activityId!)
        .subscribe((activity) => {
          this.activityForm.setValue({
            title: activity.title,
            description: activity.description,
            type: activity.type,
            date: activity.date,
            startTime: activity.startTime,
            endTime: activity.endTime,
            duration: {
              hours: activity.duration.hour,
              minutes: activity.duration.minute,
            },
            barometer: activity.barometer,
          });
        });
    }
  }

  ngOnInit() {
    this.activityForm
      .get('endTime')
      ?.addValidators(
        endTimeValidator(this.activityForm.value.startTime || '')
      );

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
    this.activityForm.markAllAsTouched();
    if (this.activityForm.invalid) {
      return;
    }

    const title = (
      this.activityForm.value.title ||
      this.activityForm.value.type ||
      ''
    ).trim();
    const description = (this.activityForm.value.description || '').trim();

    this.activity = {
      title: title,
      description: description,
      type: this.activityForm.value.type!,
      date: this.activityForm.value.date!,
      startTime: this.activityForm.value.startTime!,
      endTime: this.activityForm.value.endTime!,
      duration: {
        hour: this.activityForm.value.duration!.hours || 0,
        minute: this.activityForm.value.duration!.minutes || 0,
      },
      barometer: this.activityForm.value.barometer!,
    };

    if (this.formType === 'create') {
      this.activityService.createActivity(this.activity).subscribe(() => {
        this.router.navigate(['/activities']);
      });
    } else {
      this.activityService
        .updateActivity(this.activity, this.activityId!)
        .subscribe(() => {
          this.router.navigate(['/activities/' + this.activityId]);
        });
    }
  }
}
