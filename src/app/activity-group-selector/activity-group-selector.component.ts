import { NgFor } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-activity-group-selector',
  standalone: true,
  imports: [NgFor],
  templateUrl: './activity-group-selector.component.html',
})
export class ActivityGroupSelectorComponent {
  @Input() selectedGroup!: string;
  @Output() selectedGroupChange = new EventEmitter<string>();
  choices = [
    'All',
    'Running',
    'Cycling',
    'Swimming',
    'Hiking',
    'Walking',
    'Other',
  ];

  onGroupSelected(group: string): void {
    this.selectedGroup = group;
    this.selectedGroupChange.emit(group);
  }
}
