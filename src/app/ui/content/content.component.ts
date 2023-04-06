import { Component } from '@angular/core';

@Component({
  selector: 'app-content',
  template: `
        <app-content-page-heading [heading]="'My Day'"></app-content-page-heading>
        <!-- container for tasks -->
        <div class="my-4 flex-grow overflow-y-auto ">
           <!-- card containing taks start -->
           <div class="py-3 px-4 my-1 bg-gray-200 rounded-lg flex  space-x-4">
               <div class="radio-container">
                  <input type="radio" class="radio"/>
               </div>  
               <div class="task-container">
                  design ui 
               </div>   
               <div class="star-container">
                   <i class="fa-regular fa-star"></i>
               </div>
           </div>
           <!-- card containing taks end -->
    
        </div>  

         <!-- text-box for adding todo item -->
           <div class="relative w-full">
            <!-- plus icon -->
            <i class="fas fa-plus absolute flex items-center inset-y-0 left-0 pl-3"></i>
            
            <!-- radio button -->
            <div class="absolute top-0 left-0 w-10 h-full flex items-center justify-center rounded-l-lg opacity-0">
              <input type="radio" class="hidden"/>
            </div>
            
            <!-- input field -->
            <input type="text" class="w-full py-3 pl-9 pr-40 rounded-lg outline-none" placeholder="Add a new task...">

            <!--right side button container -->
            <div class="absolute top-0 right-0 h-full flex items-center">
              <button class="h-full w-10 flex items-center justify-center rounded-r-lg hover:bg-gray-200 transition duration-300">
                  <i class="far fa-folder"></i>
              </button>

              <button class="h-full w-10 flex items-center justify-center rounded-r-lg hover:bg-gray-200 transition duration-300">
                  <i class="far fa-calendar-alt"></i>
              </button>

              <button class="h-full w-10 flex items-center justify-center rounded-r-lg hover:bg-gray-200 transition duration-300">
                  <i class="far fa-clock"></i>
              </button>

              <button class="h-full w-10 flex items-center justify-center rounded-r-lg hover:bg-gray-200 transition duration-300">
                  <i class="fas fa-redo"></i>
              </button>

            </div>
           </div>       
          <!-- text-box end -->
        
  `,
  styles: [
  ]
})
export class ContentComponent {

}
