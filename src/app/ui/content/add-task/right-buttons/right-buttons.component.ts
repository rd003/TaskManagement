import { Component, Input } from '@angular/core';
import { DropDownValuesModel, SelectedDropDownModel } from 'src/app/models/dropdown-values.model';

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
            <a *ngFor="let option of dueDateOptions" (click)="selectDueDate(option)" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
               {{option.label}}
            </a>
           
            <a href="#" class="block px-4 py-2 text-sm text-red-700 hover:bg-gray-100 hover:text-red-900" (click)="removeDueDate()">Remove due date</a>
          </div>
        </div>
      </div>
              
      <!-- remind me button -->

      <div class="relative">
        <button (click)="toggleDropdown(rightSideButtons.REMIND_ME)" class="h-full space-x-1 flex items-center justify-center rounded-r-lg hover:bg-gray-200 transition duration-300 tooltip" data-tip="Remind me">
           <i class="far fa-clock"></i>
           <span *ngIf="selectedRemindMeOption.value">
                 {{selectedRemindMeOption.value|date:'yyyy-MM-dd hh:mm'}}
           </span>
        </button>

        <!--remind me dropdown menu -->
        <div *ngIf="activeButton===rightSideButtons.REMIND_ME.toString()" class="absolute bottom-8 right-0 mb-0.5 mr-4 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100">
          <div class="py-1" >
            <a (click)="selectRemindMe(option)" *ngFor="let option of remindMeOptions" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">{{option.label}}</a>
            <a (click)="removeRemindMe()" class="block px-4 py-2 text-sm text-red-700 hover:bg-gray-100 hover:text-red-900">Remove reminder</a>
          </div>
        </div>
      </div>



      <!-- repeat button -->
             
      <div class="relative">
        <button (click)="toggleDropdown(rightSideButtons.REPEAT)" class="h-full space-x-1 flex items-center justify-center rounded-r-lg hover:bg-gray-200 transition duration-300 tooltip" data-tip="repeat">
           <i class="fas fa-repeat"></i>
           <span *ngIf="selectedRepeatOption.value">
                {{selectedRepeatOption.label}}
           </span>
        </button>

        <!-- repeat dropdown menu -->
        <div *ngIf="activeButton===rightSideButtons.REPEAT.toString()" class="absolute bottom-8 right-0 mb-0.5 mr-4 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100">
          <div class="py-1" >
            <a *ngFor="let option of repeatOptions" (click)="selectRepeatOption(option)" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">{{option.label}}</a>
            
            <a (click)="removeRepeatOption()" class="block px-4 py-2 text-sm text-red-700 hover:bg-gray-100 hover:text-red-900">Never repeat</a>   
          </div>
        </div>
      </div>
              
   </div>
  `,
  styles: [
  ]
})
export class RightButtonsComponent {
  @Input() dueDateOptions!: DropDownValuesModel[];
  @Input() remindMeOptions!: DropDownValuesModel[];
  @Input() repeatOptions!: DropDownValuesModel[];
  
  activeButton = "";
  rightSideButtons = RightSideButtons;

  // due date section
  selectedDueDate:SelectedDropDownModel = {label:"",value:""};

  selectDueDate(dueDate: DropDownValuesModel) {
    this.selectedDueDate = {label:dueDate.label,value:dueDate.value()};
    // hide the open drop down menu
    this.hideDropdown();
  }

  removeDueDate() {
    this.selectedDueDate = { label: "", value: "" };
    this.hideDropdown();
    
  }
  
  // remind me section
  selectedRemindMeOption:SelectedDropDownModel = {label:"",value:""};

  selectRemindMe(remindMeOption:DropDownValuesModel) {
    this.selectedRemindMeOption = {label:remindMeOption.label,value:remindMeOption.value()};
    // hide the open drop down menu
    this.hideDropdown();
  }

  removeRemindMe() {
    this.selectedRemindMeOption = { label: "", value: "" };
    this.hideDropdown();
  }

  // repeat sections


  selectedRepeatOption: SelectedDropDownModel = { label: '', value: '' };

  selectRepeatOption(repeatOption:DropDownValuesModel) {
    this.selectedRepeatOption = {label:repeatOption.label,value:repeatOption.value()};
    // hide the open drop down menu
    this.hideDropdown();
  }

  removeRepeatOption() {
    this.selectedRepeatOption = { label: "", value: "" };
    this.hideDropdown();
    
  }


  hideDropdown() {
    this.activeButton = "";
  }
 
  toggleDropdown(button: RightSideButtons) {
    if (this.activeButton === button.toString())
      this.activeButton = ""
    else
      this.activeButton=button.toString()
  }
}
