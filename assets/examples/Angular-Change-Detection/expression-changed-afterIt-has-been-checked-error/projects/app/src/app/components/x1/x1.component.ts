import { Component, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-x1',
  template: `
    <div style="border: 1px solid; padding: 10px;">
      x1 works!
    </div>
  `,
  styles: [
  ]
})
export class X1Component implements OnInit {

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('x1 => ngOnChanges()', changes);
  }

  ngOnInit(): void {
    console.log('x1 => ngOnInit()');
  }

  ngDoCheck(): void {
    console.log('x1 => ngDoCheck()');
  }

  ngAfterContentInit(): void {
    console.log('x1 => ngAfterContentInit()');
  }

  ngAfterContentChecked(): void {
    console.log('x1 => ngAfterContentChecked()');
  }

  ngAfterViewInit(): void {
    console.log('x1 => ngAfterViewInit()');
  }

  ngAfterViewChecked(): void {
    console.log('x1 => ngAfterViewChecked()');
  }

  ngOnDestroy(): void {
    console.log('x1 => ngOnDestroy()');
  }
}
