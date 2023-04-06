import { Component } from '@angular/core';

@Component({
  selector: 'app-sidenav-links',
  template: `
    <!-- nav section start -->
    <nav class="flex flex-col space-y-1">
            <!-- nav link -->
            <a href="" class="space-x-3 flex items-center text-gray-600 hover:bg-gray-200 hover:text-gray-800 py-2 px-3 rounded-lg">
                <i class="fa-regular fa-sun" aria-hidden="true"></i>
                <span class="link-text">My day</span>
            </a>
      
            <!-- nav link -->
            <a href="" class="space-x-3 flex items-center text-gray-600 hover:bg-gray-200 hover:text-gray-800 py-2 px-3 rounded-lg">
              <i class="fa-regular fa-star"></i>

              <span class="link-text">Important</span>
            </a>

             <!-- nav link -->
             <a href="" class="space-x-3 flex items-center text-gray-600 hover:bg-gray-200 hover:text-gray-800 py-2 px-3 rounded-lg">
              <i class="fas fa-tasks"></i>
              <span class="link-text">Tasks</span>
            </a>
          </nav>
         <!-- nav section ends -->
  `,
  styles: [
  ]
})
export class SidenavLinksComponent {

}
