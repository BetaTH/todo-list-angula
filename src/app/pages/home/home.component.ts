import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { v4 as uuid } from 'uuid';
import { LucideIconsModule } from '../../components/lucide-icons/lucide-icons.module';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { LocalStorageModule } from '../../services/local-storage/local-storage.module';
import { TaskComponent } from '../../components/tasks/task.component';

export interface Task {
  id: string;
  title: string;
  isDone: boolean;
}

@Component({
  selector: 'home-root',
  standalone: true,
  imports: [
    TaskComponent,
    FormsModule,
    CommonModule,
    LucideIconsModule,
    LocalStorageModule,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  tasks: Task[] = [];
  tasksToDoCount = 0;
  tasksCount = 0;
  constructor(private localStorageService: LocalStorageService) {
    this.tasks = this.localStorageService.get('tasks') || [];
    this.updateTasksCount();
  }

  newTask: string = '';

  addTask() {
    if (this.newTask) {
      this.tasks.push({ id: uuid(), title: this.newTask, isDone: false });
      this.newTask = '';
    }
    this.updateLocalStorageTasks();
    this.updateTasksCount();
  }

  removeTask(task: Task) {
    this.tasks = this.tasks.filter((t) => t.id !== task.id);
    this.updateLocalStorageTasks();
    this.updateTasksCount();
  }

  toggleIsDone(task: Task) {
    this.tasks.map((t) => {
      if (t.id === task.id) {
        t.isDone = !t.isDone;
      }
      return t;
    });
    this.updateLocalStorageTasks();
    this.updateTasksCount();
  }

  clearTasks() {
    this.tasks = [];
    this.localStorageService.remove('tasks');
    this.updateTasksCount();
  }

  getTasksToDoCount() {
    return this.tasks.filter((t) => !t.isDone).length;
  }

  getTasksDoneCount() {
    return this.tasks.filter((t) => t.isDone).length;
  }

  getTasksCount() {
    return this.tasks.length;
  }

  updateLocalStorageTasks() {
    this.localStorageService.set('tasks', this.tasks);
  }

  updateTasksCount() {
    this.tasksToDoCount = this.getTasksToDoCount();
    this.tasksCount = this.getTasksCount();
  }
}
