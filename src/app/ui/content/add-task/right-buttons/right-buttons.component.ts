import { Component, EventEmitter, Input, Output } from '@angular/core';
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
        <app-dropdown-menu
        [dropDownOptions]="dueDateOptions"
        [iconClass]="'far fa-calendar-alt'"
        [tooltipText]="'Add due date'"
        [removeOptionText]="'Remove due date'"
        [rightSideButtonValue]="rightSideButtons.DUE_DATE"
        [selectedValue]="selectedDueDateOption.label"
        (optionSelectedEvent)="selectDueDateOption($event)"
        (optionRemovedEvent)="removeSelectedDueDate()"
        >
        </app-dropdown-menu>

        <app-dropdown-menu
        [dropDownOptions]="remindMeOptions"
        [iconClass]="'far fa-clock'"
        [tooltipText]="'Add Reminder'"
        [removeOptionText]="'Remove reminder'"
        [rightSideButtonValue]="rightSideButtons.REMIND_ME"
        [selectedValue]="convertToDate(selectedRemindMeOption.value)"
        (optionSelectedEvent)="selectRemindMeOption($event)"
        (optionRemovedEvent)="removeSelectedRemindMe()"
        >
        </app-dropdown-menu>

        <app-dropdown-menu
        [dropDownOptions]="repeatOptions"
        [iconClass]="'fas fa-repeat'"
        [tooltipText]="'Repeat'"
        [removeOptionText]="'No repeat'"
        [rightSideButtonValue]="rightSideButtons.REPEAT"
        [selectedValue]="selectedRepeatOption.label"
        (optionSelectedEvent)="selectRepeatOption($event)"
        (optionRemovedEvent)="removeSelectedRepeat()"
        >
        </app-dropdown-menu>
                 
   </div>
  `,
  styles: [
  ]
})
export class RightButtonsComponent {
  @Input() dueDateOptions!: DropDownValuesModel[];
  @Input() remindMeOptions!: DropDownValuesModel[];
  @Input() repeatOptions!: DropDownValuesModel[];

  @Output() dueDateSelected = new EventEmitter<SelectedDropDownModel>();
  @Output() remindMeSelected = new EventEmitter<SelectedDropDownModel>();
  @Output() repeatSelected = new EventEmitter<SelectedDropDownModel>();
  // @ViewChild('dropDownMenuComponent') dropDownMenuComponent!: DropdownMenuComponent;
  
  
  activeButton = "";
  rightSideButtons = RightSideButtons;
  selectedDueDateOption: SelectedDropDownModel={label:"",value:""};
  selectedRemindMeOption: SelectedDropDownModel={label:"",value:""};
  selectedRepeatOption: SelectedDropDownModel={label:"",value:""};

  selectDueDateOption(selectedOption:SelectedDropDownModel) {
    this.selectedDueDateOption = selectedOption;
    this.dueDateSelected.emit(selectedOption);
  }

  selectRemindMeOption(selectedOption:SelectedDropDownModel) {
    this.selectedRemindMeOption = selectedOption;
    this.remindMeSelected.emit(selectedOption);
  }

  selectRepeatOption(selectedOption:SelectedDropDownModel) {
    this.selectedRepeatOption = selectedOption;
    this.repeatSelected.emit(selectedOption);

  }


  removeSelectedDueDate() {
    this.selectedDueDateOption = { label: "", value: "" };
  }

  removeSelectedRemindMe() {
    this.selectedRemindMeOption = { label: "", value: "" };
  }

  removeSelectedRepeat() {
    this.selectedRepeatOption= { label: "", value: "" };
  }

  convertToDate(value: string | number): string {
    if (!value) {
      return ""
    }
    const date = typeof value === 'string' ? new Date(value) : new Date(value * 1000);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  }
  
}

