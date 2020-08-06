import { Component, OnInit, ChangeDetectorRef, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-x',
  template: `
    <div>
      <button (click)="onDetach()">x (detach)</button>
      <button (click)="onReattach()">x (reattach)</button>
      <button (click)="onDetectChanges()">x (detectChanges)</button>
      app-x, {{time}}
      <app-x1></app-x1>
      <app-x2></app-x2>
    </div>
  `,
  styles: [
  ]
})
export class XComponent implements OnInit {

  constructor(private ref: ChangeDetectorRef) { }

  get time(): number {
    return new Date().getTime();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('x => ngOnChanges()', changes);
  }

  ngOnInit(): void {
    console.log('x => ngOnInit()');
  }

  ngDoCheck(): void {
    console.log('x => ngDoCheck()');
  }

  ngAfterContentInit(): void {
    console.log('x => ngAfterContentInit()');
  }

  ngAfterContentChecked(): void {
    console.log('x => ngAfterContentChecked()');
  }

  ngAfterViewInit(): void {
    console.log('x => ngAfterViewInit()');
  }

  ngAfterViewChecked(): void {
    console.log('x => ngAfterViewChecked()');
  }

  ngOnDestroy(): void {
    console.log('x => ngOnDestroy()');
  }

  onDetach(): void {
    this.ref.detach();
  }

  onReattach(): void {
    this.ref.reattach();
  }

  onDetectChanges(): void {
    this.ref.detectChanges();
  }
}
