import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DropDownValuesModel, SelectedDropDownModel } from 'src/app/models/dropdown-values.model';
import { RightSideButtons } from '../../content/add-task/right-buttons/right-buttons.component';

@Component({
  selector: 'app-dropdown-menu',
  template: `
      <div class="relative">
        <button class="h-full space-x-1 flex items-center justify-center rounded-r-lg hover:bg-gray-200 transition duration-300 tooltip" data-tip="Add due date" (click)="toggleDropdown(rightSideButtonValue)">
            <i [class]="iconClass"></i>
            <span *ngIf="selectedValue">
                 {{selectedValue}}
           </span>
        </button>
        
        <!-- add due date dropdown -->
        <div *ngIf="activeButton===rightSideButtonValue.toString()" class="absolute bottom-8 right-0 mb-0.5 mr-4 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100">
          <div class="py-1" >
            <a *ngFor="let option of dropDownOptions" (click)="selectOption(option)" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
               {{option.label}}
            </a>
           
            <a href="#" class="block px-4 py-2 text-sm text-red-700 hover:bg-gray-100 hover:text-red-900" (click)="removeSelectedOption()">{{removeOptionText}}</a>
          </div>
        </div> 
      </div> 
  `,
  styles: [
  ]
})
export class DropdownMenuComponent {

  @Input() iconClass!: string;
  @Input() dropDownOptions!: DropDownValuesModel[];
  @Input() tooltipText!: string;
  @Input() removeOptionText!: string;
  @Input() rightSideButtonValue!: number;
  @Input() selectedValue!: string;
  
  @Output() optionSelectedEvent = new EventEmitter<SelectedDropDownModel>();
  @Output() optionRemovedEvent = new EventEmitter<void>();

  selectedOption:SelectedDropDownModel = {label:"",value:""};
  showDropdown = false;
  activeButton = "";

  selectOption(option:DropDownValuesModel) {
    this.selectedOption = {label:option.label,value:option.value()};
    // hide the open drop down menu
    this.optionSelectedEvent.emit(this.selectedOption);
    this.hideDropdown();
  }

  removeSelectedOption() {
    this.selectedOption = { label: "", value: "" };
    this.optionRemovedEvent.emit();
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
