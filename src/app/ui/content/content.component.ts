import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {  Observable, distinct, map, tap } from 'rxjs';
import { TaskCategory } from 'src/app/models/task-category.model';
import { TaskModel } from 'src/app/models/task.model';
import { AppState } from 'src/app/states/app-state';
import { TaskActions } from 'src/app/states/task/task.actions';
import * as TaskSelectors from '../../states/task/task.selectors'

@Component({
  selector: 'app-content',
  template: `
    <ng-container *ngIf="{
      loading:loading$|async,
      tasks:tasks$|async,
      pendingTasks:pendingTasks$|async,
      completedTasks:completedTasks$|async,
      selectedCategory:selectedCategory$|async
    }
       as data">
     <!-- container for tasks -->
     <app-page-heading [heading]="data.selectedCategory?.title??''"></app-page-heading>

      <div class="my-4  flex-grow overflow-y-auto" [ngClass]="{'flex items-center justify-center':data.loading}">

         <button *ngIf="data.loading" class="btn btn-square loading"></button>

         <!-- load pending tasks -->
         <app-task-display *ngIf="!data.loading" 
         [tasks]="data.pendingTasks??[]"
         (toggleTaskEvent)="toggleTask($event)"
         (toggleMarkImportant)="toggleMarkImportant($event)"
         [displayCategory]="data.selectedCategory?.title==='Important'"
         >
         </app-task-display>

         <button *ngIf="data.completedTasks && data.completedTasks.length>0" class="bg-gray-200 hover:bg-white text-black py-1 px-2 rounded flext space-x-1" (click)="toggleCompletedTasks()">
           <i class="fas" [ngClass]="{'fa-caret-down':showCompletedTasks,'fa-caret-up':!showCompletedTasks}"></i>
          
            <span>Completed</span>
            <span class="font-semibold"> {{data.completedTasks.length}} </span>
        </button>
         <!-- load completed tasks -->
         <app-task-display *ngIf="showCompletedTasks && !data.loading" 
         [tasks]="data.completedTasks??[]"
         (toggleTaskEvent)="toggleTask($event)"
         (toggleMarkImportant)="toggleMarkImportant($event)"
         [displayCategory]="data.selectedCategory?.title==='Important'"
         >

         </app-task-display>
         <!-- card containing taks end -->
           
      </div> 

        <app-add-task [selectedCategory]="data.selectedCategory"></app-add-task>   

        </ng-container>
         

         <!-- text-box for adding todo item -->
          <!-- text-box end -->
        
  `,
  styles: [
  ]
})
export class ContentComponent implements OnInit,OnDestroy {
  tasks$!: Observable<ReadonlyArray<TaskModel>>; 
  pendingTasks$!: Observable<ReadonlyArray<TaskModel>>;
  completedTasks$!: Observable<ReadonlyArray<TaskModel>>;
  loading$!: Observable<boolean>;
  error$!: Observable<HttpErrorResponse | null>;
  selectedCategory$!: Observable<TaskCategory | null>;
  showCompletedTasks = false;
  // destroy$: Subject<boolean> = new Subject<boolean>();

  toggleTask(task: TaskModel) {
    const updatedTask = { ...task, completed: !task.completed };
    this._store.dispatch(TaskActions.updateTask({ task: updatedTask }));
  }

  toggleMarkImportant(task: TaskModel) {
    const updatedTask = { ...task, isImportant: !task.isImportant };
    this._store.dispatch(TaskActions.updateTask({ task: updatedTask }));
  }

  toggleCompletedTasks() {
      this.showCompletedTasks = !this.showCompletedTasks;
   }

  
  constructor(private _store:Store<AppState>) {
   
  }
  
  ngOnInit(): void {
    this.tasks$ = this._store.select(TaskSelectors.selectTasksBySelectedCategory);
    
    this.pendingTasks$ = this.tasks$.pipe(
      map(a => a.filter(a => a.completed === false))
    );
    this.completedTasks$ = this.tasks$.pipe(
      map(a => a.filter(a => a.completed === true))
    );
    this.loading$ = this._store.pipe(
      select(state => state.tasksState.loading));
    this.error$ = this._store.pipe(
      select(state => state.tasksState.error));
    this.selectedCategory$ = this._store.pipe(
      select(state => state.taskCategories.selectedTaskCategory)
    )
    this._store.dispatch(TaskActions.loadTasks());

      
    
  }

  
  ngOnDestroy(){
   
  }
}
