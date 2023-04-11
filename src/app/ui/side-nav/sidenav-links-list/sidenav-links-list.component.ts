import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskCategory } from 'src/app/models/task-category.model';

@Component({
  selector: 'app-sidenav-links-list',
  template: `
    <a *ngFor="let taskCategory of taskCategories" class="space-x-3 flex items-center text-gray-600 hover:bg-gray-200 hover:text-gray-800 py-2 px-3 rounded-lg">
                <i class="{{taskCategory.icon}}" aria-hidden="true"></i>
                <span (click)="selectTaskCategory(taskCategory)" class="link-text cursor-pointer">{{taskCategory.title}}</span>
            </a>
  `,
  styles: [
  ]
})
export class SidenavLinksListComponent {
  @Input() taskCategories!: ReadonlyArray<TaskCategory>;
  @Output() SelectTaskCategoryEvent = new EventEmitter<TaskCategory>();
  
  selectTaskCategory(taskCategory: TaskCategory) {
    this.SelectTaskCategoryEvent.emit(taskCategory);
  }
}
