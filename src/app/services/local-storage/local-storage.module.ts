import { NgModule } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@NgModule({
  providers: [LocalStorageService],
})
export class LocalStorageModule {
  title = 'todo-list';
}
