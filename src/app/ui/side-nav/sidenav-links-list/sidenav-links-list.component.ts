import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { TaskCategory } from 'src/app/models/task-category.model';

@Component({
  selector: 'app-sidenav-links-list',
  template: `
    <a *ngFor="let taskCategory of taskCategories" class="space-x-3 flex items-center text-gray-600 hover:bg-gray-200 hover:text-gray-800 py-2 px-3 rounded-lg" [ngClass]="{'text-gray-800 bg-gray-200':taskCategory.id==selectedTaskCategory?.id}">
                <i class="{{taskCategory.icon}}" aria-hidden="true"></i>
                <span (click)="selectTaskCategory(taskCategory)" class="link-text cursor-pointer">{{taskCategory.title}} </span>
                
            </a>
            
    <div *ngIf="showAddNewTaskCategoryInput" class="space-x-3 flex items-center text-gray-600  py-2 px-3 rounded-lg">
      <!-- input for adding a new task category  -->
       <input type="text" class="w-full rounded-lg outline-0 text-md  py-2 px-3" #addCategoryInput (keydown)="onKeyDown($event,addCategoryInput.value)" (focusout)="onFocusout(addCategoryInput.value)" autofocus>
    </div>
   
  `,
  styles: [
  ]
})
export class SidenavLinksListComponent {
  keyDownFlag = false;
  @Input() taskCategories!: ReadonlyArray<TaskCategory>;
  @Input() selectedTaskCategory!: TaskCategory | null;
  @Output() selectTaskCategoryEvent = new EventEmitter<TaskCategory>();
  @Input() showAddNewTaskCategoryInput!: boolean;
  @Output() newCategoryInputFocusOutEvent = new EventEmitter<string>();
  @Output() onKeyDownEvent = new EventEmitter<string>();

  selectTaskCategory(taskCategory: TaskCategory) {
    this.selectTaskCategoryEvent.emit(taskCategory);
  }
  
  onFocusout(value: string) {
    if (!this.keyDownFlag) {
       this.newCategoryInputFocusOutEvent.emit(value);
    }
    this.keyDownFlag = false;
  }
  
  onKeyDown(event: KeyboardEvent, value: string) {
    if (event.key === 'Enter') {
       event.preventDefault();
       this.keyDownFlag = true;
       this.onKeyDownEvent.emit(value);
    }
  }

  getElementRef(): ElementRef {
    return this.elementRef;
  }

  constructor(private elementRef: ElementRef) {
    
  }


}
