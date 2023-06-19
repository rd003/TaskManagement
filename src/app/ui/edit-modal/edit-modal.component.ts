import { Component,Input,Output,EventEmitter, OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { EMPTY, Subject, catchError, debounceTime, takeUntil, tap } from 'rxjs';
import { TaskAttachmentCreateModel } from 'src/app/models/task-attachment.model';
import { TaskModel } from 'src/app/models/task.model';
import { AppState } from 'src/app/states/app-state';
import { taskAttachmentActions } from 'src/app/states/task-attachment/task-attachment.actions';
import { TaskActions } from 'src/app/states/task/task.actions';

import * as TaskSelectors from 'src/app/states/task/task.selectors';
import * as TaskAttachmentSelectors from 'src/app/states/task-attachment/task-attachment.selectors';


@Component({
  selector: 'app-edit-modal',
  template: `
   <div *ngIf="showPopup"  class="relative h-screen lg:w-96 w-[70%] bg-gray-100 transition duration-300 ease-in-out">
         <!-- close button -->
         <button (click)="closePopupEvent.emit()" class=" text-gray-600 p-2  hover:text-gray-800 absolute top-0 right-0">
           X
         </button>
          
         <!-- form -->
          <form  [formGroup]="frm">
         <div  class="flex-col absolute w-full mt-6 p-3 space-y-2 ">
             <!-- column 1 -->          
             <div>
                 <input  type="text" formControlName="title" placeholder="Title"
                 [ngClass]="{'border-red-500':controls['title']['invalid'] && (controls['title']['dirty'] || controls['title']['touched'])}"
                  class="p-2 border-[1px] rounded-sm border-gray-600 text-lg font-bold outline-0 py-3 px-5 w-full" >
             </div>

              <!-- column 2 -->
              <div class="border-[1px]  rounded-sm border-gray-600 p-2">
                  <!-- reminder -->
                  <div class="reminder px-2 py-1 rounded-sm flex space-x-2 text-sm items-center cursor-pointer border-b-2 border-gray-300 hover:bg-gray-200">
                      <i class="far fa-clock"></i>
                      <span class="flex-grow ml-auto">
                         Add reminder
                      </span>
                      <span class="h-full  py-1 px-2 self-center">X</span>
                  </div>

                   <!-- due date -->
                   <div class="due-date px-2 py-1 rounded-sm flex space-x-2 text-sm items-center cursor-pointer border-b-2 border-gray-300 hover:bg-gray-200">
                      <i class="fa-calendar-alt far"></i>
                      <span class="flex-grow ml-auto">
                         Add Due Date
                      </span>
                      <span class="h-full  py-1 px-2 self-center">X</span>
                  </div>

                   <!-- repeat -->
                   <div class="due-date px-2 py-1 rounded-sm flex space-x-2 text-sm items-center cursor-pointer border-b-2 border-gray-300 hover:bg-gray-200">
                      <i class="fa-repeat fas"></i>
                      <span class="flex-grow ml-auto">
                         Repeat
                      </span>
                      <span class="h-full  py-1 px-2 self-center">X</span>
                  </div>
                  
              </div>

              <!-- column 3 -->
              <div class="flex-col space-y-2 p-2 border-[1px] rounded-sm border-gray-600 ">
                  <div class="flex items-center pl-2 rounded-sm hover:bg-gray-200 cursor-pointer" *ngFor="let fileAttachment of task.taskAttachments">
                    <div class="flex-grow text-sm ml-auto" >
                      <a [href]="fileAttachment.file_path" target="_blank">{{fileAttachment.attachment}}</a>
                    </div>
                    <button (click)="removeAttachment(fileAttachment.id)" class="h-full border-0 hover:bg-gray-300 py-1 px-2 self-center">
                      X
                    </button>
                </div>
                    
                 
                <label for="file-upload"  class=" cursor-pointer rounded-md  text-sm text-gray-600 px-2 py-2 flex space-x-1 items-center">
                  <i class="fas fa-paperclip"></i>
                  <span>Upload a file</span>
                  <input id="file-upload" name="file-upload" (change)="onFileSelected($event)" type="file" class="w-0 h-0 p-0 overflow-hidden m-[-1px] whitespace-nowrap border-0 rect">
                </label>
                
             </div>
             
             <!-- column 4 -->
             <div>
                 <textarea  formControlName="note" placeholder="Add Note"
                  [ngClass]="{'border-red-500':controls['note']['invalid'] && (controls['note']['dirty'] || controls['note']['touched'])}"
                  class="p-2 border-[1px] rounded-sm border-gray-600 text-sm  outline-0 py-3 px-5 w-full"></textarea>
             </div>
           </div>

        </form>
  </div>
  `,
  styles: [
  ]
})
export class EditModalComponent implements OnInit,OnChanges,OnDestroy {
  @Input() showPopup!: boolean;
  @Output() closePopupEvent = new EventEmitter<void>();
  @Input() task!: TaskModel;
  frm!: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
  selectedFile: File | null = null;

  get controls() {
    return this.frm.controls;
  }

  

  ngOnInit(): void {
    this.frm = this.fb.group({
      id: [''],
      title: ['',[Validators.minLength(4),Validators.required]],
      due_date:[''],
      reminder_date:[''],
      repeat_type:[''],
      note:['',Validators.minLength(5)]
    });

    this.frm.valueChanges.pipe(
      debounceTime(300),
      tap(task => {
        if (this.frm.valid) {
          this.store.dispatch(TaskActions.updateTask({ task }));
        }
      }),
      takeUntil(this.destroy$)
    ).subscribe();
    
    // this.tas.getAllAttachment().pipe(
    //   tap(console.log),
    //   catchError(error =>
    //   {
    //     console.log(error);
    //     return EMPTY;
    //  })
    // ).subscribe();

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['task'] && this.task) {
       //console.log(this.task)
       this.frm.patchValue(this.task);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  // updateTask(task:TaskModel) {
  //   console.log(task)
  // }

  removeAttachment(id: string) {
    this.store.dispatch(taskAttachmentActions.deleteTaskAttachment({ id }));
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile == null || this.task == null)
       return;
    const allowedExtensions = ['jpg', 'png', 'jpeg', 'pdf', 'doc', 'docx', 'xls'];
    const fileExtension:string = this.selectedFile?.name.split('.').pop()?.toLowerCase()??"";
    if (!allowedExtensions.includes(fileExtension))
      return;
    const taskAttachment: TaskAttachmentCreateModel = {
      task_id: this.task.id,
      file: this.selectedFile
    };
    this.store.dispatch(taskAttachmentActions.addTaskAttachment({ taskAttachment }));
    // this.store.select(TaskAttachmentSelectors.selectTaskAttachments).pipe(
    //   tap(console.log)
    // ).subscribe()
    // this.store.select(TaskSelectors.tasksWithCategory).pipe(
    //   tap(console.log)
    // ).subscribe()
    
    // this.tas.uploadFile(taskReq).pipe(
    //   tap(console.log),
    //   catchError(error => { console.log(error); return EMPTY})
    // ).subscribe();
  }
  
  constructor(private fb: FormBuilder,
    private store: Store<AppState>) {
   
  }
}
