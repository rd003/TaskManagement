import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { TaskCategoryActions } from '../../../states/task-category/task-category.actions';
import { Observable } from 'rxjs';
import { TaskCategory } from 'src/app/models/task-category.model';
import { HttpErrorResponse } from '@angular/common/http';
import { AppState } from 'src/app/states/app-state';
@Component({
  selector: 'app-sidenav-links',
  template: `
    <!-- nav section start -->
    <nav class="flex flex-col space-y-1">
      <ng-container *ngIf="taskCategories$|async as taskCategories">
       <app-sidenav-links-list [taskCategories]="taskCategories" (SelectTaskCategoryEvent)="dispatchSelectTaskCategory($event)"></app-sidenav-links-list>
      </ng-container>
    </nav>
         <!-- nav section ends -->
  `,
  styles: [
  ]
})
export class SidenavLinksComponent implements OnInit {
  taskCategories$!: Observable<ReadonlyArray<TaskCategory>>;
  loading$!: Observable<boolean>;
  error$!: Observable<HttpErrorResponse|null>;
 // selectedTaskCategory$: Observable<TaskCategory|null> = this._store.select(TaskCategorySelectors.selectedTaskCategory);
  ngOnInit() {
    this._store.dispatch(TaskCategoryActions.loadCategories());
    this.taskCategories$ = this._store.pipe(
      select(state=>state.taskCategories.taskCategories)
    );
    this.loading$ = this._store.pipe(select(state=>state.taskCategories.loading));
    this.error$ = this._store.pipe(select(state=>state.taskCategories.error));
    
    // loading the default selected category
    this._store.dispatch(TaskCategoryActions.loadDefaultSelectedTaskCategory());
  }

  dispatchSelectTaskCategory(selectedTaskCategory: TaskCategory) {
    //console.log(selectedTaskCategory);
    this._store.dispatch(TaskCategoryActions.selectTaskCategory({selectedTaskCategory}))
  }
  
  constructor(private _store: Store<AppState>) {
     
  }
}
