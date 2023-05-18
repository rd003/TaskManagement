import { Component } from '@angular/core';
import { TaskModel } from 'src/app/models/task.model';

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
         <app-content (OnSelectedTaskEvent)="onSelectedTask($event)" class="px-10 py-7  h-screen bg-gradient-to-r from-pink-400 to-pink-800 flex-1 flex flex-col"></app-content>
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
export class MainLayoutComponent {
  hideSidenav = true;
  showPopup = true;
  selectedTask!: TaskModel;
  toggleSidenav() {
    this.hideSidenav = !this.hideSidenav;
  }

  closePopup() {
    this.showPopup=false;
  }

  // openPopup() {
  //   this.showPopup = true;
  // }

  onSelectedTask(task: TaskModel) {
    this.showPopup = true;
    this.selectedTask = task;
  }
}
