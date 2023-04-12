import {AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { TaskCategoryActions } from '../../../states/task-category/task-category.actions';
import { Observable, tap } from 'rxjs';
import { TaskCategory } from 'src/app/models/task-category.model';
import { HttpErrorResponse } from '@angular/common/http';
import { AppState } from 'src/app/states/app-state';
import { TaskCategoryLinkActions } from 'src/app/states/task-category-link/task-category-link.action';
import { SidenavLinksListComponent } from '../sidenav-links-list/sidenav-links-list.component';
@Component({
  selector: 'app-sidenav-links',
  template: `
    <!-- nav section start -->
    <nav class="flex flex-col space-y-1">
      <ng-container *ngIf="{taskCategories:taskCategories$|async,selectedTaskCategory:selectedTaskCategory$|async,showAddNewTaskCategoryInput:showAddNewTaskCategoryInput$|async} as data">
       <app-sidenav-links-list #linksList
        [taskCategories]="data.taskCategories??[]" [selectedTaskCategory]=data.selectedTaskCategory 
         [showAddNewTaskCategoryInput]="data.showAddNewTaskCategoryInput??false"
         (selectTaskCategoryEvent)="dispatchSelectTaskCategory($event)"
         (newCategoryInputFocusOutEvent)="onNewCategoryInputFocusout($event)"
         (inputElementReady)="onInputElementReady($event)"
         ></app-sidenav-links-list>
      </ng-container>
    </nav>
         <!-- nav section ends -->
  `,
  styles: [
  ]
})
export class SidenavLinksComponent implements OnInit,AfterViewInit {
  taskCategories$!: Observable<ReadonlyArray<TaskCategory>>;
  loading$!: Observable<boolean>;
  error$!: Observable<HttpErrorResponse|null>;
  selectedTaskCategory$!: Observable<TaskCategory | null>;
  showAddNewTaskCategoryInput$!: Observable<boolean>;
  @ViewChild('addCategoryInput', { read: ElementRef }) addCategoryInput!: ElementRef<HTMLInputElement>;


  onInputElementReady(inputElement: HTMLInputElement) {
    this.addCategoryInput =  new ElementRef(inputElement);
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      console.log('parent ',this.addCategoryInput);
      this.showAddNewTaskCategoryInput$ = this._store.pipe(select(state => state.taskCategoryLink.showAddNewTaskCategoryInput)).pipe(
        tap(value => {
          if (value) {
           // this.addCategoryInput.nativeElement.focus();
          }
        })
      )
    }, 0);
    
  }

  ngOnInit() {
    this.taskCategories$ = this._store.pipe(
      select(state=>state.taskCategories.taskCategories)
    );
    this.loading$ = this._store.pipe(select(state=>state.taskCategories.loading));
    this.error$ = this._store.pipe(select(state => state.taskCategories.error));
    // getting the selected category from store
    this.selectedTaskCategory$= this._store.select(state=>state.taskCategories.selectedTaskCategory);
    // loading the default selected category into a store
    this._store.dispatch(TaskCategoryActions.loadDefaultSelectedTaskCategory());
    // loading task categories into a store 
    this._store.dispatch(TaskCategoryActions.loadCategories());
    // getting the state of ShowAddNewTaskCategoryInput
    // it will basically check the condition of showing the text box in the nav list, that text box will add new category list
    
  }

  dispatchSelectTaskCategory(selectedTaskCategory: TaskCategory) {
    //console.log(selectedTaskCategory);
    this._store.dispatch(TaskCategoryActions.selectTaskCategory({selectedTaskCategory}))
  }

  /* when we focus out from add new category input, then it will do few things
   1. This input box should disappear 👈 work on it
   2. change the value of toggleAddNewTaskcategoryInput to 'false',
      it means we would dispatch the related action here ✅
   3. add new task category action should be dispatch 
  */
  onNewCategoryInputFocusout(title:string) {
    this.toggleAddNewTaskCategoryInput();
    if (title) {
      this.addNewTaskCategory(title);
    }
  }
  
  private addNewTaskCategory(title:string) {
    const taskCategory: TaskCategory = {
           id: '',
           collectionId: '',
           created: '',
           updated: '',
           collectionName:'',
           title: title,
           can_modified: true,
           icon: "fa fa-bars"
    };
   this._store.dispatch(TaskCategoryActions.addTaskCategory({ taskCategory }));
  }

  private toggleAddNewTaskCategoryInput() {
    this._store.dispatch(TaskCategoryLinkActions.toggleAddNewTaskcategoryInput());
  }

  constructor(private _store: Store<AppState>) {
     
  }
  
}
