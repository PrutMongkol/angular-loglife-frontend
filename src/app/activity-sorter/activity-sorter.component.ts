import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-activity-sorter',
  standalone: true,
  imports: [NgFor],
  templateUrl: './activity-sorter.component.html',
})
export class ActivitySorterComponent {
  @Input() selectedSort!: string;
  @Output() selectedSortChange = new EventEmitter<string>();

  sortOptions = ['Newest First', 'Oldest First'];

  onSortSelected(sort: string): void {
    this.selectedSort = sort;
    this.selectedSortChange.emit(sort);
  }
}
