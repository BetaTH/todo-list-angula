import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { v4 as uuid } from 'uuid';
import { LucideIconsModule } from '../../components/lucide-icons/lucide-icons.module';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { LocalStorageModule } from '../../services/local-storage/local-storage.module';

export interface Task {
  id: string;
  title: string;
  isDone: boolean;
}

@Component({
  selector: 'home-root',
  standalone: true,
  imports: [FormsModule, CommonModule, LucideIconsModule, LocalStorageModule],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  tasks: Task[] = [];
  constructor(private localStorageService: LocalStorageService) {
    this.tasks = this.localStorageService.get('tasks') || [];
  }

  title = 'todo-list';
  newTask: string = '';

  addTask() {
    if (this.newTask) {
      this.tasks.push({ id: uuid(), title: this.newTask, isDone: false });
      this.newTask = '';
    }
    this.updateLocalStorageTasks();
  }

  removeTask(task: Task) {
    this.tasks = this.tasks.filter((t) => t.id !== task.id);
    this.updateLocalStorageTasks();
  }

  toggleIsDone(task: Task) {
    this.tasks.map((t) => {
      if (t.id === task.id) {
        t.isDone = !t.isDone;
      }
      return t;
    });
    this.updateLocalStorageTasks();
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

  clearTasks() {
    this.tasks = [];
    this.localStorageService.remove('tasks');
  }
}
