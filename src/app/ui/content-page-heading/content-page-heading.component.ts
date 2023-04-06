import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-content-page-heading',
  template: `
    <h2 class="text-2xl font-bold">{{heading}}</h2>
  `,
  styles: [
  ]
})
export class ContentPageHeadingComponent {
  @Input() heading:string="";
}
