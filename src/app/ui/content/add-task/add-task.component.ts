import { Component, OnInit,Input, ViewChild } from '@angular/core';
import { InputFieldComponent } from './input-field/input-field.component';
import { DropdownMenuService } from 'src/app/services/dropdown-menu.service';
import { DropDownValuesModel, SelectedDropDownModel } from 'src/app/models/dropdown-values.model';
import { RightButtonsComponent } from './right-buttons/right-buttons.component';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/states/app-state';
import { TaskActions } from 'src/app/states/task/task.actions';
import { TaskCategory } from 'src/app/models/task-category.model';
import {  Subject } from 'rxjs';

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
export class AddTaskComponent implements OnInit {
  inputFocus = false;
  @Input() selectedCategory!: TaskCategory|null;
  // @Output() submitFormEvent = new EventEmitter<any>();
  @ViewChild('InputFieldComponent') inputFieldComponent!: InputFieldComponent;
  @ViewChild('rightButtonsComponent') rightButtonsComponent!: RightButtonsComponent;
  
  dueDateOptions:DropDownValuesModel[] = this.dropdownMenuService.getDueDateOptions();
  remindMeOptions:DropDownValuesModel[] = this.dropdownMenuService.getRemindMeOptions();
  repeatOptions:DropDownValuesModel[] = this.dropdownMenuService.getRepeatOptions();
  // selectedCategory$!: Observable<TaskCategory | null>;
  
  selectedDueDateOption: SelectedDropDownModel={label:"",value:""};
  selectedRemindMeOption: SelectedDropDownModel={label:"",value:""};
  selectedRepeatOption: SelectedDropDownModel = { label: "", value: "" };
   destroy$: Subject<boolean> = new Subject<boolean>();
  
  

  selectDueDate(selectedOption:SelectedDropDownModel) {
    this.selectedDueDateOption = selectedOption;
  }

  selectRemindMe(selectedOption:SelectedDropDownModel) {
    this.selectedRemindMeOption = selectedOption;
  }
  
  selectRepeat(selectedOption:SelectedDropDownModel) {
    this.selectedRepeatOption = selectedOption;
  }


  onInputFocus() {
    this.inputFocus = true;
  }
  
  onInputFocusout() {
    setTimeout(() => {
      this.inputFocus = false;
    }, 200);
  }

 
  onSubmitForm(task: any) {
    if (task.title.length < 4) {
      alert("title should not be less that 4 character")
      return;
    }
    task.due_date = this.selectedDueDateOption.value;
    task.reminder_date = this.selectedRemindMeOption.value;
    task.repeat_type = this.selectedRepeatOption.value;
    task.task_category_id = this.selectedCategory?.id;
    this._store.dispatch(TaskActions.addTask({task}))
    this.removeAllSelectedValues();
  }

  private removeAllSelectedValues():void {
    this.rightButtonsComponent.removeSelectedDueDate();
    this.rightButtonsComponent.removeSelectedRemindMe();
    this.rightButtonsComponent.removeSelectedRepeat();
  }

  

  onRadioClick() {
    this.inputFieldComponent.onSubmit();
  }

  ngOnInit(): void {
   
    
  }


  constructor(private dropdownMenuService:DropdownMenuService,private _store:Store<AppState>) {
    
  }


 
}
