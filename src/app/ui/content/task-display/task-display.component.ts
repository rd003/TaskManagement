import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TaskModel } from 'src/app/models/task.model';

@Component({
  selector: 'app-task-display',
  template: `
          <div *ngFor="let task of pendingTasks" class="py-3 px-4 my-1 bg-gray-200 rounded-lg flex">
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

           <button *ngIf="showToggleCompletedButton" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" (click)="toggleCompletedTasks()">Show completed tasks</button>
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
export class TaskDisplayComponent implements AfterViewInit {
  
   @Input() tasks!: ReadonlyArray<TaskModel>;
   @Output() toggleTaskEvent = new EventEmitter<TaskModel>();

   pendingTasks!:ReadonlyArray<TaskModel>;
   completedTasks!:ReadonlyArray<TaskModel>;
   showCompletedTasks = false;

   toggleCompletedTasks() {
      this.showCompletedTasks = !this.showCompletedTasks;
   }
   showToggleCompletedButton!: boolean;

   ngAfterViewInit(): void {
     setTimeout(() => {
      this.pendingTasks = this.tasks.filter(a => !a.completed);
      this.completedTasks = this.tasks.filter(a => a.completed);
      this.showToggleCompletedButton = this.completedTasks.length > 0;   
     }, 300);
   }
   
}
