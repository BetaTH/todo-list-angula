import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LucideIconsModule } from '../lucide-icons/lucide-icons.module';

export interface Task {
  id: string;
  title: string;
  isDone: boolean;
}

@Component({
  selector: 'task',
  standalone: true,
  imports: [CommonModule, LucideIconsModule],
  templateUrl: './task.component.html',
})
export class TaskComponent {
  @Input({ required: true }) task!: Task;
  @Input({ required: true }) isLast!: boolean;
  @Input({ required: true }) isFirst!: boolean;

  @Output() handleRemoveTask = new EventEmitter();
  @Output() handleToggleIsDone = new EventEmitter();

  removeTask() {
    this.handleRemoveTask.emit();
  }

  toggleIsDone() {
    this.handleToggleIsDone.emit();
  }
}
