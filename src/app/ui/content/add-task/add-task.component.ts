import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { InputFieldComponent } from './input-field/input-field.component';
import { DropdownMenuService } from 'src/app/services/dropdown-menu.service';
import { DropDownValuesModel, SelectedDropDownModel } from 'src/app/models/dropdown-values.model';
import { RightButtonsComponent } from './right-buttons/right-buttons.component';

@Component({
  selector: 'app-add-task',
  template: `
   <div class="relative w-full">
            <app-plus-icon *ngIf="!inputFocus"></app-plus-icon>
           
            <app-radio *ngIf="inputFocus" (onRadioClickEvent)="onRadioClick()"></app-radio>

            <app-input-field 
            (onFocusout)="onInputFocusout()"
            (onFocus)="onInputFocus()"
            (onSubmitEvent)="onSubmitForm($event)"
            #InputFieldComponent
            ></app-input-field>

            <!-- this component will show only when input field have a value -->
            <app-right-buttons #rightButtonsComponent
            [dueDateOptions]="dueDateOptions"
            [remindMeOptions]="remindMeOptions"
            [repeatOptions]="repeatOptions"
            (dueDateSelected)="selectDueDate($event)"
            (remindMeSelected)="selectRemindMe($event)"
            (repeatSelected)="selectRepeat($event)"
            >

            </app-right-buttons>
   </div> 

  `,
  styles: [
  ]
})
export class AddTaskComponent {
  inputFocus = false;
  @Output() submitFormEvent = new EventEmitter<any>();
  @ViewChild('InputFieldComponent') inputFieldComponent!: InputFieldComponent;
  @ViewChild('rightButtonsComponent') rightButtonsComponent!: RightButtonsComponent;
 
  selectedDueDateOption: SelectedDropDownModel={label:"",value:""};
  selectedRemindMeOption: SelectedDropDownModel={label:"",value:""};
  selectedRepeatOption: SelectedDropDownModel = { label: "", value: "" };

  selectDueDate(selectedOption:SelectedDropDownModel) {
    this.selectedDueDateOption = selectedOption;
  }

  selectRemindMe(selectedOption:SelectedDropDownModel) {
    this.selectedRemindMeOption = selectedOption;
  }
  
  selectRepeat(selectedOption:SelectedDropDownModel) {
    this.selectedRepeatOption = selectedOption;
  }

  dueDateOptions:DropDownValuesModel[] = this.dropdownMenuService.getDueDateOptions();
  remindMeOptions:DropDownValuesModel[] = this.dropdownMenuService.getRemindMeOptions();
  repeatOptions:DropDownValuesModel[] = this.dropdownMenuService.getRepeatOptions();

  onInputFocus() {
    this.inputFocus = true;
  }
  
  onInputFocusout() {
    setTimeout(() => {
      this.inputFocus = false;
    }, 200);
  }

  onSubmitForm(formValues: any) {
    formValues.due_date = this.selectedDueDateOption.value;
    formValues.reminder_date = this.selectedRemindMeOption.value;
    formValues.repeat_type = this.selectedRepeatOption.value;
    this.submitFormEvent.emit(formValues);
    this.rightButtonsComponent.removeSelectedDueDate();
    this.rightButtonsComponent.removeSelectedRemindMe();
    this.rightButtonsComponent.removeSelectedRepeat();
   // console.log(formValues);
    //console.log(this.selectedDueDateOption)
  }

  

  onRadioClick() {
    //console.log('clicked')
    this.inputFieldComponent.onSubmit();
  }



  constructor(private dropdownMenuService:DropdownMenuService) {
    
  }

 
}
