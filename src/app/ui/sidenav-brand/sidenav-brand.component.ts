import { Component } from '@angular/core';

@Component({
  selector: 'app-sidenav-brand',
  template: `
  <div class="py-4 px-6 bg-gray-800 flex items-center">
         <div class="brand mr-3 flex justify-center items-center h-10 w-10 rounded-full bg-pink-700">
              <span class="text-lg font-bold">JD</span>
         </div>
         <div class="userinfo text-xl text-white">
              John Doe
         </div>
       </div>
  `,
  styles: [
  ]
})
export class SidenavBrandComponent {

}
