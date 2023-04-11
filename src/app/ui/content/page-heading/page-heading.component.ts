import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-heading',
  template: `
    <h2 class="text-2xl font-bold">{{heading}}</h2>
  `,
  styles: [
  ]
})
export class PageHeadingComponent {
  @Input() heading='';
}
