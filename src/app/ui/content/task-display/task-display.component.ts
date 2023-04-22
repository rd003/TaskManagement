import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

           <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" (click)="showCompletedTasks = true">Show completed tasks</button>
           <ng-container *ngIf="showCompletedTasks">
               <div class="py-3 px-4 my-1 bg-gray-200 rounded-lg flex" 
                *ngFor="let task of completedTasks">
                     <div class="radio-container mr-2">
                     <input type="radio" (click)="toggleTaskEvent.emit(task)" class="radio" />
                     </div>
                     <div class="task-container line-through">
                     {{ task.title }}
                     </div>
                     <div class="star-container ml-auto">
                     <i class="fa-regular fa-star"></i>
                     </div>
              </div>
           </ng-container>
    
  `,
  styles: [
  ]
})
export class TaskDisplayComponent implements OnInit {
  
   @Input() tasks!: ReadonlyArray<TaskModel>;
   @Output() toggleTaskEvent = new EventEmitter<TaskModel>();

   pendingTasks!:ReadonlyArray<TaskModel>;
   completedTasks!:ReadonlyArray<TaskModel>;
   showCompletedTasks = true;

   ngOnInit(): void {
      this.pendingTasks = this.tasks.filter(a => !a.completed);
      this.completedTasks = this.tasks.filter(a => a.completed);
   }
   
}
