import { Component,Input,Output,EventEmitter } from '@angular/core';
import { TaskModel } from 'src/app/models/task.model';

@Component({
  selector: 'app-edit-modal',
  template: `
   <div *ngIf="showPopup"  class="relative h-screen lg:w-96 w-[70%] bg-gray-100 transition duration-300 ease-in-out">
         <!-- close button -->
         <button (click)="closePopupEvent.emit()" class=" text-gray-600 p-2  hover:text-gray-800 absolute top-0 right-0">
           X
         </button>

         <!-- form -->
         <!-- <div *ngIf="task" class="flex-col"> -->
         <div  class="flex-col absolute w-full mt-6 p-3 space-y-2 ">
             <!-- column 1 -->
             <div>
                 <input type="text" placeholder="Title" class="p-2 border-[1px] rounded-sm border-gray-600 text-lg font-bold outline-0 py-3 px-5 w-full" >
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
                  <div class="flex items-center pl-2 rounded-sm hover:bg-gray-200 cursor-pointer">
                    <div class="flex-grow text-sm  ml-auto">filename.ext</div>
                    <button class="h-full border-0 hover:bg-gray-300 py-1 px-2 self-center">
                      X
                    </button>
                </div>
                    
                 
                <label for="file-upload" class=" cursor-pointer rounded-md  text-sm text-gray-600 px-2 py-2 flex space-x-1 items-center">
                  <i class="fas fa-paperclip"></i>
                  <span>Upload a file</span>
                  <input id="file-upload" name="file-upload" type="file" class="w-0 h-0 p-0 overflow-hidden m-[-1px] whitespace-nowrap border-0 rect">
                </label>
                
             </div>
             
             <!-- column 4 -->
             <div>
                 <textarea placeholder="Add Note" class="p-2 border-[1px] rounded-sm border-gray-600 text-sm  outline-0 py-3 px-5 w-full"></textarea>
             </div>

         </div>
  </div>
  `,
  styles: [
  ]
})
export class EditModalComponent {
  @Input() showPopup!: boolean;
  @Output() closePopupEvent = new EventEmitter<void>();
  @Input() task!: TaskModel;
}
