import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as TaskCategorySelectors from '../../../states/task-category/task-category.selectors';
import * as TaskCategoryActions from '../../../states/task-category/task-category.actions';
import { Observable } from 'rxjs';
import { TaskCategory } from 'src/app/models/task-category.model';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-sidenav-links',
  template: `
    <!-- nav section start -->
    <nav class="flex flex-col space-y-1">
      <ng-container *ngIf="taskCategories$|async as taskCategories">
       <app-sidenav-links-list [taskCategories]="taskCategories"></app-sidenav-links-list>
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

  ngOnInit() {
    this._store.dispatch(TaskCategoryActions.loadCategories());
    this.taskCategories$ = this._store.select(TaskCategorySelectors.selectTaskCategories);
    this.loading$ = this._store.select(TaskCategorySelectors.selectTaskCategoriesLoading);
    this.error$ = this._store.select(TaskCategorySelectors.selectTaskCategoriesError);
  }
  
  constructor(private _store: Store) {
     
  }
}
