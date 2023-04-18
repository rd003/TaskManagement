import { Component } from '@angular/core';

export enum RightSideButtons{
  'DUE_DATE'=1,
  'REMIND_ME',
  'REPEAT'
}



@Component({
  selector: 'app-right-buttons',
  template: `
    <!--right side button container -->
    <div class="absolute top-0 right-0 h-full flex space-x-3 mr-2 items-center">
              
      <!-- add due date button -->
      <div class="relative">
        <button class="h-full space-x-1 flex items-center justify-center rounded-r-lg hover:bg-gray-200 transition duration-300 tooltip" data-tip="Add due date" (click)="toggleDropdown(rightSideButtons.DUE_DATE)">
            <i class="far fa-calendar-alt"></i>
            <span *ngIf="selectedDueDate.value">
                 {{selectedDueDate.label}}
           </span>
         
        </button>
        
        <!-- add due date dropdown -->
        <div *ngIf="activeButton===rightSideButtons.DUE_DATE.toString()" class="absolute bottom-8 right-0 mb-0.5 mr-4 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100">
          <div class="py-1" >
            <a *ngFor="let dropdown of dueDateDropdownValues" (click)="selectDueDate(dropdown)" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
               {{dropdown.label}}
            </a>
           
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" (click)="removeDueDate()">Remove due date</a>
          </div>
        </div>
      </div>
              
      <!-- remind me button -->

      <div class="relative">
        <button (click)="toggleDropdown(rightSideButtons.REMIND_ME)" class="h-full flex items-center justify-center rounded-r-lg hover:bg-gray-200 transition duration-300 tooltip" data-tip="Remind me">
           <i class="far fa-clock"></i>
        </button>

        <!--remind me dropdown menu -->
        <div *ngIf="activeButton===rightSideButtons.REMIND_ME.toString()" class="absolute bottom-8 right-0 mb-0.5 mr-4 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100">
          <div class="py-1" >
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">Later Today</a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">Tomorrow</a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">Next week</a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">Pick a date</a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">Remove reminder</a>
          </div>
        </div>
      </div>



      <!-- repeat button -->
             
      <div class="relative">
        <button (click)="toggleDropdown(rightSideButtons.REPEAT)" class="h-full  flex items-center justify-center rounded-r-lg hover:bg-gray-200 transition duration-300 tooltip" data-tip="repeat">
           <i class="fas fa-repeat"></i>
        </button>

        <!-- repeat dropdown menu -->
        <div *ngIf="activeButton===rightSideButtons.REPEAT.toString()" class="absolute bottom-8 right-0 mb-0.5 mr-4 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100">
          <div class="py-1" >
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">Daily</a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">Week days</a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">Weekly</a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">Monthly</a>  
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">Custom</a>  
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">Never repeat</a>   
          </div>
        </div>
      </div>
              
   </div>
  `,
  styles: [
  ]
})
export class RightButtonsComponent {
  activeButton = "";
  rightSideButtons = RightSideButtons;
  selectedDueDate = {label:"",value:""};
  dueDateDropdownValues = [
    {
      label: 'Today', value: () => {
        const today = new Date();
        return today.toISOString();
      }
    },
    {
      label: 'Tommorow',
      value: () => {
        const date = new Date();
        date.setDate(date.getDate() + 1);
        return date.toISOString();;
      }
    },
    {
      label: 'Next Week',
      value: () => {
        const date = new Date();
        date.setDate(date.getDate() + 7);
        return date.toISOString();;
      }
    },
    {
      label: 'Pick a date',
      value: () => {
         return ""
      }
    },
  ]

  hideDropdown() {
    this.activeButton = "";
  }

  selectDueDate(dueDate:{ label: string; value: () => string; }) {
    this.selectedDueDate = {label:dueDate.label,value:dueDate.value()};
    // hide the open drop down menu
    this.hideDropdown();
  }

  removeDueDate() {
    this.selectedDueDate = { label: "", value: "" };
    this.hideDropdown();
    
  }
 
  toggleDropdown(button: RightSideButtons) {
    if (this.activeButton === button.toString())
      this.activeButton = ""
    else
      this.activeButton=button.toString()
  }
}
