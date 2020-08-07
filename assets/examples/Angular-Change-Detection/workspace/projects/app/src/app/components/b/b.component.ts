import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-b',
  template: `
    <div style="border: 1px solid; padding: 10px;">
      <button (click)="0">trigger change detection from b</button>
      app-b, {{p}}
      <app-c [p]="p" [o]="o"></app-c>
    </div>
  `,
  styles: [
  ]
})
export class BComponent implements OnInit {

  @Input()
  p = 0;

  @Input()
  o = {};

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('b => ngOnChanges()', changes);
  }

  ngOnInit(): void {
    console.log('b => ngOnInit()');
  }

  ngDoCheck(): void {
    console.log('b => ngDoCheck()', this.o);
  }

  ngAfterContentInit(): void {
    console.log('b => ngAfterContentInit()');
  }

  ngAfterContentChecked(): void {
    console.log('b => ngAfterContentChecked()');
  }

  ngAfterViewInit(): void {
    console.log('b => ngAfterViewInit()');
  }

  ngAfterViewChecked(): void {
    console.log('b => ngAfterViewChecked()');
  }

  ngOnDestroy(): void {
    console.log('b => ngOnDestroy()');
  }
}
