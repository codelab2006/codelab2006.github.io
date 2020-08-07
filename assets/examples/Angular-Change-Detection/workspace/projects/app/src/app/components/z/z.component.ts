import { Component, OnInit, ChangeDetectionStrategy, SimpleChanges, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-z',
  template: `
    <div style="border: 1px solid; padding: 10px;">
      <button (click)="onDetach()">z (detach)</button>
      <button (click)="onReattach()">z (reattach)</button>
      <button (click)="onMarkForCheck()">z (markForCheck)</button>
      app-z (ChangeDetectionStrategy.OnPush), {{time}}
    </div>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZComponent implements OnInit {

  constructor(private ref: ChangeDetectorRef) { }

  get time(): number {
    return new Date().getTime();
  }

  onDetach(): void {
    this.ref.detach();
  }

  onReattach(): void {
    this.ref.reattach();
  }

  onMarkForCheck(): void {
    this.ref.markForCheck();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('z => ngOnChanges()', changes);
  }

  ngOnInit(): void {
    console.log('z => ngOnInit()');
  }

  ngDoCheck(): void {
    console.log('z => ngDoCheck()');
  }

  ngAfterContentInit(): void {
    console.log('z => ngAfterContentInit()');
  }

  ngAfterContentChecked(): void {
    console.log('z => ngAfterContentChecked()');
  }

  ngAfterViewInit(): void {
    console.log('z => ngAfterViewInit()');
  }

  ngAfterViewChecked(): void {
    console.log('z => ngAfterViewChecked()');
  }

  ngOnDestroy(): void {
    console.log('z => ngOnDestroy()');
  }
}
