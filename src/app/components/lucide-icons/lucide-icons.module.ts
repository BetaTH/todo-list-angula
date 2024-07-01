import { NgModule } from '@angular/core';
import {
  LucideAngularModule,
  Trash,
  Check,
  Undo,
  ListTodo,
  Plus,
  X,
} from 'lucide-angular';

@NgModule({
  exports: [LucideAngularModule],
  imports: [
    LucideAngularModule.pick({ Trash, Check, Undo, ListTodo, Plus, X }),
  ],
})
export class LucideIconsModule {
  title = 'todo-list';
}
