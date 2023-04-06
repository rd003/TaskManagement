import { Component } from '@angular/core';

@Component({
  selector: 'app-sidenav-search',
  template: `
    <div class="searchbar relative mb-4">
               <!-- input search box -->
              <input type="text" placeholder="Search"  class="w-full rounded-lg border border-gray-400 py-1 px-3"/>
              <!-- search icon relative to search input box -->
              <div class="icon absolute h-full w-12 flex items-center justify-center top-0 right-0">
                <i class="fas fa-search text-gray-600"></i>
              </div>
           </div>
  `,
  styles: [
  ]
})
export class SidenavSearchComponent {

}
