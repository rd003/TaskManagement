import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  template: `
     <!-- input field -->
       <form [formGroup]="taskForm" (ngSubmit)="onSubmit()" #frmTask>
        <input type="text" (focus)="onFocus.emit()" (focusout)="onFocusout.emit()" formControlName="title"  class="w-full py-3 pl-10 pr-40 rounded-lg outline-none" placeholder="Add a new task...">
        </form>
        
  `,
  styles: [
  ]
})
export class InputFieldComponent {
  @Output() onFocus = new EventEmitter<void>();
  @Output() onFocusout = new EventEmitter<void>();
  @Output() onSubmitEvent = new EventEmitter<any>();

  taskForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    due_date: new FormControl(''),
    reminder_date: new FormControl(''),
    repeat_type:new FormControl('')
  })
   
  onSubmit() {
    this.onSubmitEvent.emit(this.taskForm.value);
    this.taskForm.reset();
  }
}
