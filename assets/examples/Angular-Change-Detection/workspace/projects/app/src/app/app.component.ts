import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <button (click)="changeP()">change p</button>
    <button (click)="changeO()">change o</button>
    <app-a [p]="p" [o]="o"></app-a>
  `,
  styles: []
})
export class AppComponent {

  pv = 10;

  o = {
    field: 'value'
  }

  get p(): number {
    return this.pv;
  }

  changeP(): void {
    this.pv++;
  }

  changeO(): void {
    this.o.field = 'NNN';
  }
}
