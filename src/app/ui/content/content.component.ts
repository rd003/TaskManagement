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
    <ng-container *ngIf="selectedCategory$|async as selectedCategory">
      <app-page-heading [heading]="selectedCategory.title"></app-page-heading>
    </ng-container>

       
    <ng-container *ngIf="{loading:loading$|async,tasks:tasks$|async} as data">
     <!-- container for tasks -->
      <div class="my-4  flex-grow overflow-y-auto" [ngClass]="{'flex items-center justify-center':data.loading}">

         <button *ngIf="data.loading" class="btn btn-square loading"></button>

         <!-- card containing taks start -->
         <app-task-display *ngIf="!data.loading" [tasks]="data.tasks??[]"></app-task-display>
         <!-- card containing taks end -->
           
      </div> 
        </ng-container>
         

         <!-- text-box for adding todo item -->
          <app-add-task></app-add-task>   
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
    
    this._store.dispatch(TaskActions.loadTasks())

    // this.selectedCategory$.pipe(
    //   concatMap(taskCategory => {
    //     // this._store.dispatch(TaskActions.loadTasks({ taskCategoryId: taskCategory ? taskCategory.id : '' }))
    //     return EMPTY
    //   }),
    //   takeUntil(this.destroy$)
    // ).subscribe();

  }

  
  ngOnDestroy(){
    // this.destroy$.next(true);
    // this.destroy$.unsubscribe();
  }
}
