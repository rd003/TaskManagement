import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { TaskCategory } from 'src/app/models/task-category.model';
import { AppState } from 'src/app/states/app-state';
import { TaskCategoryLinkActions } from 'src/app/states/task-category-link/task-category-link.action';
import { TaskCategoryActions } from 'src/app/states/task-category/task-category.actions';

@Component({
  selector: 'app-side-nav',
  template: `
    <div id="side-nav" [ngClass]="{'-translate-x-full':hideSideNav}" class="w-64 z-10 bg-gray-100 h-screen flex flex-col absolute inset-y-0 left-0 transform -translate-x-full lg:relative lg:translate-x-0 transition duration-200 ease-in-out">
        
        <app-sidenav-brand></app-sidenav-brand>

      <!-- middle section starts-->
        <div class="middle flex flex-1 flex-col px-2 py-4">
           <app-sidenav-search></app-sidenav-search>
           <app-sidenav-links></app-sidenav-links>
        </div>
      <!-- middle-section-end -->

        <app-sidenav-bottom (toggleAddNewTaskCategoryEvent)="toggleAddNewTaskCategoryInput()"></app-sidenav-bottom>
     </div>
  `,
  styles: [
  ]
})
export class SideNavComponent {
  @Input() hideSideNav = true;

  // dispatch 'toggleAddNewTaskcategoryInput' action (done)
  toggleAddNewTaskCategoryInput() {
    this._store.dispatch(TaskCategoryLinkActions.toggleAddNewTaskcategoryInput());
  }

  
  
  constructor(private _store: Store<AppState>) {
     
  }
}
