import { Component, Input } from '@angular/core';

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

        <app-sidenav-bottom></app-sidenav-bottom>
      
     </div>
  `,
  styles: [
  ]
})
export class SideNavComponent {
  @Input() hideSideNav = true;
}
