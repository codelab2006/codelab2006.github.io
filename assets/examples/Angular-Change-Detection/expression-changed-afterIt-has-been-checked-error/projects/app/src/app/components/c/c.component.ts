import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-c',
  template: `
    <div style="border: 1px solid; padding: 10px;">
      <button (click)="0">trigger change detection from c</button>
      app-c, {{p}} {{o | json}}
      <app-z></app-z>
      <app-x></app-x>
    </div>
  `,
  styles: [
  ]
})
export class CComponent implements OnInit {

  @Input()
  p = 0;

  @Input()
  o = {};

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('c => ngOnChanges()', changes);
  }

  ngOnInit(): void {
    console.log('c => ngOnInit()');
  }

  ngDoCheck(): void {
    console.log('c => ngDoCheck()', this.o);
  }

  ngAfterContentInit(): void {
    console.log('c => ngAfterContentInit()');
  }

  ngAfterContentChecked(): void {
    console.log('c => ngAfterContentChecked()');
  }

  ngAfterViewInit(): void {
    console.log('c => ngAfterViewInit()');
  }

  ngAfterViewChecked(): void {
    console.log('c => ngAfterViewChecked()');
  }

  ngOnDestroy(): void {
    console.log('c => ngOnDestroy()');
  }
}
