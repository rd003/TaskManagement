import { Component, ViewChild } from '@angular/core';
import { InputFieldComponent } from './input-field/input-field.component';
import { DropdownMenuService } from 'src/app/services/dropdown-menu.service';
import { DropDownValuesModel } from 'src/app/models/dropdown-values.model';

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
            <app-right-buttons
            [dueDateOptions]="dueDateOptions"
            [remindMeOptions]="remindMeOptions"
            [repeatOptions]="repeatOptions"
            >

            </app-right-buttons>
   </div> 

  `,
  styles: [
  ]
})
export class AddTaskComponent {
  inputFocus = false;
  @ViewChild('InputFieldComponent') inputFieldComponent!: InputFieldComponent;

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

  onSubmitForm(formValues:any) {
   // console.log(formValues);
  }

  onRadioClick() {
    //console.log('clicked')
    this.inputFieldComponent.onSubmit();
  }

  constructor(private dropdownMenuService:DropdownMenuService) {
    
  }

}
