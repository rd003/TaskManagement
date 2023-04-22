import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskModel } from 'src/app/models/task.model';

@Component({
  selector: 'app-task-display',
  template: `
     <div *ngFor="let task of tasks" class="py-3 px-4 my-1 bg-gray-200 rounded-lg flex">
               <div class="radio-container mr-2">
                  <input type="radio" (click)="toggleTaskEvent.emit(task)" class="radio"/>
               </div>  
               <div class="task-container" [ngClass]="{'line-through':task.completed}">
                  {{task.title}}
               </div>   
               <div class="star-container ml-auto">
                   <i class="fa-regular fa-star"></i>
               </div>
           </div>
  `,
  styles: [
  ]
})
export class TaskDisplayComponent {
   @Input() tasks!: ReadonlyArray<TaskModel>;
   @Output() toggleTaskEvent = new EventEmitter<TaskModel>();
   
}
