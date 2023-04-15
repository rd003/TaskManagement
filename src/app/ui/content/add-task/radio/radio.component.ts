import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-radio',
  template: `
  <!-- radio button -->
   <div class="absolute top-0 left-0 w-10 h-full flex items-center justify-center rounded-l-lg">
              <input type="radio" (click)="onRadioClickEvent.emit()"  class="radio"/>
            </div>
  `,
  styles: [
  ]
})
export class RadioComponent {
  @Output() onRadioClickEvent = new EventEmitter<void>();

  
}
