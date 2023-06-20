import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { TaskCategory } from 'src/app/models/task-category.model';

@Component({
  selector: 'app-sidenav-links-list',
  template: `
    <a *ngFor="let taskCategory of taskCategories" class="space-x-3 flex items-center text-gray-600 hover:bg-gray-200 hover:text-gray-800 py-2 px-3 rounded-lg group" [ngClass]="{'text-gray-800 bg-gray-200':taskCategory.id==selectedTaskCategory?.id}">
                <i class="{{taskCategory.icon}} text-pink-500" aria-hidden="true"></i>
                <span (click)="selectTaskCategory(taskCategory)" class="link-text cursor-pointer flex-1">{{taskCategory.title}} </span>   
                <span *ngIf="taskCategory.count>0" class="inline-block bg-pink-500 rounded-full text-white text-xs px-2 py-0.5">{{taskCategory.count}}</span>              
                <span (click)="onDeleteCategory.emit(taskCategory)" class=" bg-slate-100 rounded-sm px-2 cursor-pointer hidden group-hover:block ">
                  <i class="fa fa-trash"></i>
                </span>
              </a>
            
    <div *ngIf="showAddNewTaskCategoryInput" class="space-x-3 flex items-center text-gray-600  py-2 px-3 rounded-lg ">
       <i class="fa fa-bars text-pink-500" aria-hidden="true"></i>
       <!-- input for adding a new task category  -->
       <input type="text" class="w-full rounded-lg outline-0 text-sm  py-2 px-3" #addCategoryInput (keydown)="onKeyDown($event,addCategoryInput.value)" (focusout)="onFocusout(addCategoryInput.value)" autofocus>
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
  @Output() onDeleteCategory = new EventEmitter<TaskCategory>();
    
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
