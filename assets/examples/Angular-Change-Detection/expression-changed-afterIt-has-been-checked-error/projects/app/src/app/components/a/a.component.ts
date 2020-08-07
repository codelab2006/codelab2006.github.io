import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-a',
  template: `
    <div style="border: 1px solid; padding: 10px;">
      <button (click)="0">trigger change detection from a</button>
      app-a, {{p}}
      <app-b [p]="p" [o]="o"></app-b>
    </div>
  `,
  styles: [
  ]
})
export class AComponent implements OnInit {

  @Input()
  p = 0;

  @Input()
  o = {};

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('a => ngOnChanges()', changes);
  }

  ngOnInit(): void {
    console.log('a => ngOnInit()');
  }

  ngDoCheck(): void {
    console.log('a => ngDoCheck()', this.o);
  }

  ngAfterContentInit(): void {
    console.log('a => ngAfterContentInit()');
  }

  ngAfterContentChecked(): void {
    console.log('a => ngAfterContentChecked()');
  }

  ngAfterViewInit(): void {
    console.log('a => ngAfterViewInit()');
  }

  ngAfterViewChecked(): void {
    console.log('a => ngAfterViewChecked()');
  }

  ngOnDestroy(): void {
    console.log('a => ngOnDestroy()');
  }
}
