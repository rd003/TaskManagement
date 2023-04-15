import { Component, ViewChild } from '@angular/core';
import { InputFieldComponent } from './input-field/input-field.component';

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
            <app-right-buttons ></app-right-buttons>
   </div> 

  `,
  styles: [
  ]
})
export class AddTaskComponent {
  inputFocus = false;
  @ViewChild('InputFieldComponent') inputFieldComponent!: InputFieldComponent;

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

}
