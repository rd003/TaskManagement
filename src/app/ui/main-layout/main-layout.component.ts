import { Component } from '@angular/core';

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
    <div class="flex">
         <app-side-nav [hideSideNav]="hideSidenav"></app-side-nav>
         <app-content class="px-10 py-7  h-screen bg-gradient-to-r from-gray-600 to-blue-800 flex-1 flex flex-col"></app-content>
    </div>
  `,
  styles: [
  ]
})
export class MainLayoutComponent {
  hideSidenav = true;
  toggleSidenav() {
    this.hideSidenav = !this.hideSidenav;
  }
}
