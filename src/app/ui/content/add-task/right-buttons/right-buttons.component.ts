import { Component } from '@angular/core';

@Component({
  selector: 'app-right-buttons',
  template: `
    <!--right side button container -->
    <div class="absolute top-0 right-0 h-full flex items-center">
              
      <!-- add new date button -->
      <div class="relative">
        <button class="h-full w-10 flex items-center justify-center rounded-r-lg hover:bg-gray-200 transition duration-300 tooltip" data-tip="Add new date" style="margin-left: 8px;" (click)="toggleDropdown()">
          <i class="far fa-calendar-alt"></i>
        </button>

        <div *ngIf="showDropdown" class="absolute bottom-8 right-0 mb-0.5 mr-4 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100">
          <div class="py-1" >
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">Today</a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">Tomorrow</a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">Next week</a>
          </div>
        </div>
      </div>
              
      <!-- remind me button -->

      <div class="relative">
        <button (click)="toggleDropdown()" class="h-full w-10 flex items-center justify-center rounded-r-lg hover:bg-gray-200 transition duration-300 tooltip" data-tip="Remind me">
           <i class="far fa-clock"></i>
        </button>

        <!-- dropdown menu -->
        <div *ngIf="showDropdown" class="absolute bottom-8 right-0 mb-0.5 mr-4 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100">
          <div class="py-1" >
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">Today</a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">Tomorrow</a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">Next week</a>
          </div>
        </div>
      </div>



              <!-- repeat button -->
             
      <div class="relative">
        <button (click)="toggleDropdown()" class="h-full w-10 flex items-center justify-center rounded-r-lg hover:bg-gray-200 transition duration-300 tooltip" data-tip="repeat">
           <i class="fas fa-repeat"></i>
        </button>

        <!-- dropdown menu -->
        <div *ngIf="showDropdown" class="absolute bottom-8 right-0 mb-0.5 mr-4 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100">
          <div class="py-1" >
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">Today</a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">Tomorrow</a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">Next week</a>
          </div>
        </div>
      </div>
              
   </div>
  `,
  styles: [
  ]
})
export class RightButtonsComponent {
  showDropdown = false;

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }
}
