import { Component, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-x2',
  template: `
    <div>
      x2 works!
    </div>
  `,
  styles: [
  ]
})
export class X2Component implements OnInit {

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('x2 => ngOnChanges()', changes);
  }

  ngOnInit(): void {
    console.log('x2 => ngOnInit()');
  }

  ngDoCheck(): void {
    console.log('x2 => ngDoCheck()');
  }

  ngAfterContentInit(): void {
    console.log('x2 => ngAfterContentInit()');
  }

  ngAfterContentChecked(): void {
    console.log('x2 => ngAfterContentChecked()');
  }

  ngAfterViewInit(): void {
    console.log('x2 => ngAfterViewInit()');
  }

  ngAfterViewChecked(): void {
    console.log('x2 => ngAfterViewChecked()');
  }

  ngOnDestroy(): void {
    console.log('x2 => ngOnDestroy()');
  }

}
