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

           <button *ngIf="showToggleCompletedButton" class="bg-gray-200 hover:bg-white text-black py-1 px-2 rounded flext space-x-1" (click)="toggleCompletedTasks()">
           <i  [ngClass]="{'fas fa-caret-up':showCompletedTasks,'fas fa-caret-down':!showCompletedTasks}"></i>
          
            <span>Completed</span>
            <span class="font-semibold"> {{completedTasks.length}} </span>
            </button>
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
   showToggleCompletedButton!: boolean;

   toggleCompletedTasks() {
      this.showCompletedTasks = !this.showCompletedTasks;
   }
  
   ngAfterViewInit(): void {
     setTimeout(() => {
      this.pendingTasks = this.tasks.filter(a => !a.completed);
      this.completedTasks = this.tasks.filter(a => a.completed);
      this.showToggleCompletedButton = this.completedTasks.length > 0;
     }, 300);
   }
   
}
