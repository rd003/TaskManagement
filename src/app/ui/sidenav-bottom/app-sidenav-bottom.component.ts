import { Component } from '@angular/core';

@Component({
  selector: 'app-sidenav-bottom',
  template: `
   <div class="bottom px-2">
       <div class="bottom-inner rounded-lg flex items-center justify-between px-2 py-2 text-gray-600 hover:bg-gray-200 hover:text-gray-800">
         <a href="#" class="new-list">
           <i class="fa fa-plus"></i>
           <span>New list</span>
         </a>
         <a href="#" class="new-group">
           <i class="fa fa-plus"></i>
         </a>
      </div>
   </div>
  `,
  styles: [
  ]
})
export class AppSidenavBottomComponent {

}
