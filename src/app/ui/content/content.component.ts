import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {  Observable, Subject, combineLatestWith, distinct, map, mergeMap, startWith, switchMap, takeUntil, tap } from 'rxjs';
import { TaskCategory } from 'src/app/models/task-category.model';
import { TaskModel } from 'src/app/models/task.model';
import { AppState } from 'src/app/states/app-state';
import { TaskActions } from 'src/app/states/task/task.actions';
import * as TaskSelectors from '../../states/task/task.selectors'
import { taskAttachmentActions } from 'src/app/states/task-attachment/task-attachment.actions';
import { SelectedTaskActions } from 'src/app/states/selected-task/selected-task.actions';

@Component({
  selector: 'app-content',
  template: `
    <ng-container *ngIf="{
      loading:loading$|async,
      tasks:tasks$|async,
      pendingTasks:pendingTasks$|async,
      completedTasks:completedTasks$|async,
      selectedCategory:selectedCategory$|async,
      searchTerm:searchTerm$|async
    }
       as data">
     <!-- container for tasks -->
      <ng-container *ngIf="!data.searchTerm">
         <app-page-heading [heading]="data.selectedCategory?.title??''"></app-page-heading>
      </ng-container>

      <div class="my-4  flex-grow overflow-y-auto" [ngClass]="{'flex items-center justify-center':data.loading}">

         <button *ngIf="data.loading" class="btn btn-square loading"></button>

         <!-- load pending tasks -->
         <app-task-display *ngIf="!data.loading" 
         [tasks]="data.pendingTasks??[]"
         (toggleTaskEvent)="toggleTask($event)"
         (toggleMarkImportant)="toggleMarkImportant($event)"
         [displayCategory]="displayCategory"
         (selectedTask)="OnTaskSelect($event)"
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
         [displayCategory]="displayCategory"
         (selectedTask)="OnTaskSelect($event)"
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
export class ContentComponent implements OnInit, OnDestroy {
  tasks$!: Observable<ReadonlyArray<TaskModel>>; 
  pendingTasks$!: Observable<ReadonlyArray<TaskModel>>;
  completedTasks$!: Observable<ReadonlyArray<TaskModel>>;
  loading$!: Observable<boolean>;
  error$!: Observable<HttpErrorResponse | null>;
  selectedCategory$!: Observable<TaskCategory | null>;
  showCompletedTasks = false;
  searchTerm$!: Observable<string>;
  displayCategory = false;
  destroy$: Subject<boolean> = new Subject<boolean>();
  @Output() OnSelectedTaskEvent = new EventEmitter<TaskModel>();

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

    this.searchTerm$ = this._store.select(TaskSelectors.selectSearchQuery).pipe(
      startWith('')
    );
    
    this.tasks$ = this.searchTerm$.pipe(
      switchMap((searchTerm) => {
        if (searchTerm.length === 0)
          return this._store.select(TaskSelectors.selectTasksBySelectedCategory);
        else
          return this._store.select(TaskSelectors.selectTasksBySearchQuery(searchTerm));
        
      })
    );

   // load task attachments
    this._store.dispatch(taskAttachmentActions.loadTaskAttachment());
    
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
    
    this.selectedCategory$.pipe(
      combineLatestWith(this.searchTerm$),
      tap(([selectedTaskCategory, searchTerm]) => {
        if (selectedTaskCategory?.title === "Important" || searchTerm)
          this.displayCategory = true;
        else
          this.displayCategory = false;
      }),
      takeUntil(this.destroy$)
    ).subscribe();

    this._store.dispatch(TaskActions.loadTasks());
  }

  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  // add selected task to ngrx state
  OnTaskSelect(task: TaskModel) {
    this._store.dispatch(SelectedTaskActions.selectTask({ task }));
  }

}
