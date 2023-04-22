import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {  Observable, tap } from 'rxjs';
import { TaskCategory } from 'src/app/models/task-category.model';
import { TaskModel } from 'src/app/models/task.model';
import { AppState } from 'src/app/states/app-state';
import { TaskActions } from 'src/app/states/task/task.actions';
import * as TaskSelectors from '../../states/task/task.selectors'

@Component({
  selector: 'app-content',
  template: `
       <span>{{loading$|async}}</span>
    <ng-container *ngIf="{loading:loading$|async,tasks:tasks$|async,selectedCategory:selectedCategory$|async} as data">
     <!-- container for tasks --> <span>{{data.loading}}</span>
     <app-page-heading [heading]="data.selectedCategory?.title??''"></app-page-heading>

      <div class="my-4  flex-grow overflow-y-auto" [ngClass]="{'flex items-center justify-center':data.loading}">

         <button *ngIf="data.loading" class="btn btn-square loading"></button>

         <!-- card containing taks start -->
         <app-task-display *ngIf="!data.loading" 
         [tasks]="data.tasks??[]"
         (toggleTaskEvent)="toggleTask($event)"
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
  loading$!: Observable<boolean>;
  error$!: Observable<HttpErrorResponse | null>;
  selectedCategory$!: Observable<TaskCategory | null>;
  // destroy$: Subject<boolean> = new Subject<boolean>();

  toggleTask(task: TaskModel) {
    this._store.dispatch(TaskActions.toggleTask({ task }))
  }

  
  constructor(private _store:Store<AppState>) {
   
  }
  
  ngOnInit(): void {
    this.tasks$ = this._store.select(TaskSelectors.selectTasksBySelectedCategory);
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
