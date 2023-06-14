import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, startWith, takeUntil, tap } from 'rxjs';
import { TaskModel } from 'src/app/models/task.model';
import * as SelectTaskSelectors from 'src/app/states/selected-task/selected-task.selectors';

@Component({
  selector: 'app-main-layout',
  template: `
     <!-- Hamburger Menu Button -->
     <button id="btn-hamburger" (click)="toggleSidenav()" class="lg:hidden fixed z-50 top-0 right-0 m-4 p-2 rounded-md text-gray-500 hover:text-gray-600 focus:outline-none">
        <svg  viewBox="0 0 100 80" width="30" height="30">
          <rect width="100" height="16" fill="#808080"></rect>
          <rect y="30" width="100" height="16" fill="#808080"></rect>
          <rect y="60" width="100" height="16" fill="#808080"></rect>
        </svg>
       </button>
       <div class="flex relative">
            <app-side-nav [hideSideNav]="hideSidenav"></app-side-nav>
            <app-content class="px-10 py-7  h-screen bg-gradient-to-r from-pink-400 to-pink-800 flex-1 flex flex-col"></app-content>
            <app-edit-modal 
            (closePopupEvent)="closePopup()"
            [task]="selectedTask"
            [showPopup]="showPopup"
            >

            </app-edit-modal>
       </div>

  `,
  styles: [
  ]
})
export class MainLayoutComponent implements OnInit,OnDestroy {
  hideSidenav = true;
  showPopup = false;
  selectedTask!: TaskModel;
  destroyed$: Subject<boolean> = new Subject<boolean>();

  toggleSidenav() {
    this.hideSidenav = !this.hideSidenav;
  }

  closePopup() {
    this.showPopup=false;
  }

  // openPopup() {
  //   this.showPopup = true;
  // }

  // onSelectedTask(task: TaskModel) {
  //   this.showPopup = true;
  //   this.selectedTask = task;
  //  // console.log({ '💩': task.taskAttachments });
  //   //  adding new attachment wont reflect here, since it is already selected.
    
  // }

  // ng on init
  ngOnInit(): void {
    const selectedTask$ = this.store.select(SelectTaskSelectors.selectSelectedTask);
    selectedTask$.pipe(
      tap(task => {
        if (task) {
          this.selectedTask = task;
          this.showPopup = true;
        }
        else
          this.showPopup = false;

      }),
      takeUntil(this.destroyed$)
    ).subscribe()
  }
  
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.unsubscribe();
  }

  /**
   *
   */
  constructor(private store:Store) {
    
  }
}
