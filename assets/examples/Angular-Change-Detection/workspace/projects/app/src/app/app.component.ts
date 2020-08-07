import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div style="border: 1px solid; padding: 10px;">
      <button (click)="changeP()">change primitive</button>
      <button (click)="changeO()">change object field</button>
      <app-a [p]="p" [o]="o"></app-a>
    </div>
  `,
  styles: []
})
export class AppComponent {

  pv = 10;

  get p(): number {
    return this.pv;
  }

  o = {
    field: 'value'
  }

  changeP(): void {
    this.pv++;
  }

  changeO(): void {
    this.o.field = 'NNN';
  }
}
