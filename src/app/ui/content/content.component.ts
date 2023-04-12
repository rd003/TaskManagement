import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { EMPTY, Observable, Subject, concatMap, startWith, takeUntil, tap } from 'rxjs';
import { TaskCategory } from 'src/app/models/task-category.model';
import { TaskModel } from 'src/app/models/task.model';
import { AppState } from 'src/app/states/app-state';
import { TaskActions } from 'src/app/states/task/task.actions';

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
           <div class="relative w-full">
            <!-- plus icon -->
            <i class="fas fa-plus absolute flex items-center inset-y-0 left-0 pl-3"></i>
            
            <!-- radio button -->
            <div class="absolute top-0 left-0 w-10 h-full flex items-center justify-center rounded-l-lg opacity-0">
              <input type="radio" class="hidden"/>
            </div>
            
            <!-- input field -->
            <input type="text" class="w-full py-3 pl-9 pr-40 rounded-lg outline-none" placeholder="Add a new task...">

            <!--right side button container -->
            <div class="absolute top-0 right-0 h-full flex items-center">
              <button class="h-full w-10 flex items-center justify-center rounded-r-lg hover:bg-gray-200 transition duration-300">
                  <i class="far fa-folder"></i>
              </button>

              <button class="h-full w-10 flex items-center justify-center rounded-r-lg hover:bg-gray-200 transition duration-300">
                  <i class="far fa-calendar-alt"></i>
              </button>

              <button class="h-full w-10 flex items-center justify-center rounded-r-lg hover:bg-gray-200 transition duration-300">
                  <i class="far fa-clock"></i>
              </button>

              <button class="h-full w-10 flex items-center justify-center rounded-r-lg hover:bg-gray-200 transition duration-300">
                  <i class="fas fa-redo"></i>
              </button>

            </div>
           </div>       
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
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private _store:Store<AppState>) {
    
  }
  
  ngOnInit(): void {
    this.tasks$ = this._store.pipe(
      select(state => state.tasksState.tasks));
    this.loading$ = this._store.pipe(
      select(state => state.tasksState.loading));
    this.error$ = this._store.pipe(
      select(state => state.tasksState.error));
    this.selectedCategory$ = this._store.pipe(
      select(state=>state.taskCategories.selectedTaskCategory)
    )
    
    this.selectedCategory$.pipe(
      concatMap(taskCategory => {
        this._store.dispatch(TaskActions.loadTasks({ taskCategoryId: taskCategory ? taskCategory.id : '' }))
        return EMPTY
      }),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  
  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
