import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { TaskCategoryActions } from '../../../states/task-category/task-category.actions';
import { Observable, Subject, catchError, of, takeUntil, tap } from 'rxjs';
import { TaskCategory } from 'src/app/models/task-category.model';
import { HttpErrorResponse } from '@angular/common/http';
import { AppState } from 'src/app/states/app-state';
import { TaskCategoryLinkActions } from 'src/app/states/task-category-link/task-category-link.action';
import { SidenavLinksListComponent } from '../sidenav-links-list/sidenav-links-list.component';
import * as TaskSelectors from '../../../states/task/task.selectors';
import { SelectedTaskActions } from 'src/app/states/selected-task/selected-task.actions';
import { AppearanceAnimation, ConfirmBoxInitializer, DialogLayoutDisplay, DisappearanceAnimation } from '@costlydeveloper/ngx-awesome-popup';


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
         (onKeyDownEvent)="onKeyDown($event)"
         (onDeleteCategory)="onDeleteCategory($event)"
         ></app-sidenav-links-list>
      </ng-container>
    </nav>
         <!-- nav section ends -->
  `,
  styles: [
  ]
})
  
export class SidenavLinksComponent implements OnInit,AfterViewInit,OnDestroy {
  taskCategories$!: Observable<ReadonlyArray<TaskCategory>>;
  loading$!: Observable<boolean>;
  error$!: Observable<HttpErrorResponse|null>;
  selectedTaskCategory$!: Observable<TaskCategory | null>;
  showAddNewTaskCategoryInput$!: Observable<boolean>;
  @ViewChild(SidenavLinksListComponent) linksList!: SidenavLinksListComponent;
  destroyed$: Subject<boolean> = new Subject<boolean>();

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.showAddNewTaskCategoryInput$ = this._store.pipe(select(state => state.taskCategoryLink.showAddNewTaskCategoryInput)).pipe(
        tap(value => {
          if (value) {
           // here i want to set focus of input element
             setTimeout(() => {
               this.linksList.getElementRef().nativeElement.querySelector('input').focus();
             });
          }
        })
      )
    }, 0);
    
  }

  ngOnInit() {
    //select task categories with count
    this.taskCategories$ =    this._store.select(TaskSelectors.selectTaskCategoriesWithCount)
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
    console.log(selectedTaskCategory.id);
    this._store.dispatch(TaskCategoryActions.selectTaskCategory({selectedTaskCategory}))
    // remove selected task 
    this._store.dispatch(SelectedTaskActions.removeSelectedTask());
  }

  
  onNewCategoryInputFocusout(title: string) {
    this.updateTaskCategoryList(title);
  }

  onKeyDown(title: string) {
    this.updateTaskCategoryList(title);
  }

  /* when we focus out from add new category input or when user press Enter key, then it will do few things
   1. This input box should disappear ✅
   2. change the value of toggleAddNewTaskcategoryInput to 'false',
      it means we would dispatch the related action here ✅
   3. add new task category action should be dispatch ✅
  */
  private updateTaskCategoryList(title:string):void {
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
      icon: "fa fa-bars",
           count:0
    };
   this._store.dispatch(TaskCategoryActions.addTaskCategory({ taskCategory }));
  }

  private toggleAddNewTaskCategoryInput() {
    this._store.dispatch(TaskCategoryLinkActions.toggleAddNewTaskCategoryInput());
  }
  
  onDeleteCategory(taskCategory: TaskCategory) {
    const confirmBox = new ConfirmBoxInitializer();
    confirmBox.setTitle('Are you sure?');
    confirmBox.setMessage(`Are you sure to delete category : ${taskCategory.title} ?`);
    confirmBox.setConfig({
      layoutType: DialogLayoutDisplay.DANGER, // SUCCESS | INFO | NONE | DANGER | WARNING
      animationIn: AppearanceAnimation.BOUNCE_IN, // BOUNCE_IN | SWING | ZOOM_IN | ZOOM_IN_ROTATE | ELASTIC | JELLO | FADE_IN | SLIDE_IN_UP | SLIDE_IN_DOWN | SLIDE_IN_LEFT | SLIDE_IN_RIGHT | NONE
      animationOut: DisappearanceAnimation.BOUNCE_OUT, // BOUNCE_OUT | ZOOM_OUT | ZOOM_OUT_WIND | ZOOM_OUT_ROTATE | FLIP_OUT | SLIDE_OUT_UP | SLIDE_OUT_DOWN | SLIDE_OUT_LEFT | SLIDE_OUT_RIGHT | NONE
    });

    confirmBox.openConfirmBox$()
      .pipe(
        tap(val => {
          if (val.success) {
            this._store.dispatch(TaskCategoryActions.deleteTaskCategory({ id:taskCategory.id }));
         }
        }),
        catchError(error => {
          console.log(error);
          return of(null);
        }
        ),
        takeUntil(this.destroyed$)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.unsubscribe();
  }
  constructor(private _store: Store<AppState>) {
     
  }
  
}
