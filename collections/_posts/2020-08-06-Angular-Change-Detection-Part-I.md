---
title: Angular Change Detection (Part I)
---

## 一. 前言

类似 Angular，React 的前端框架让我们的前端开发变得高效。而他们都有一个核心的功能：Change Detection。这篇文章主要介绍 Angular 中的 Change Detection 机制，这里并不是带着大家读 Angular 的源代码。而是通过例子让大家理解和控制 Angular 中的 Change Detection，这对于前端性能优化很有帮助。

## 二. ExpressionChangedAfterItHasBeenCheckedError

在使用 Angular 的过程中，有时由于我们的代码逻辑问题，在开发模式下 Angular 会抛出 ExpressionChangedAfterItHasBeenCheckedError 异常。通过下面的例子我们来重现并且分析它。

```typescript
@Component({
  selector: "app-root",
  template: `
    当前时间戳：
    <span [textContent]="n"></span>
    <button (click)="(0)">更新时间戳</button>
  `,
  styles: [],
})
export class AppComponent {
  get n(): number {
    return Date.now();
  }

  ngOnChanges(): void {
    console.log("=> ngOnChanges()");
  }

  ngOnInit(): void {
    console.log("=> ngOnInit()");
  }

  ngDoCheck(): void {
    console.log("=> ngDoCheck()");
  }

  ngAfterContentInit(): void {
    console.log("=> ngAfterContentInit()");
  }

  ngAfterContentChecked(): void {
    console.log("=> ngAfterContentChecked()");
  }

  ngAfterViewInit(): void {
    console.log("=> ngAfterViewInit()");
  }

  ngAfterViewChecked(): void {
    console.log("=> ngAfterViewChecked()");
  }

  ngOnDestroy(): void {
    console.log("=> ngOnDestroy()");
  }
}
```

在上面的例子中我们将 getter n 返回的时间戳绑定到了 span 的 textContent 属性上，并且添加了 log 来记录 Angular 组件 lifecycle hook 方法的调用。当我们点击更新时间戳按钮时，你会看到 ExpressionChangedAfterItHasBeenCheckedError 异常被抛出。如下所示：

![screenshot](/assets/images/expression-changed-afterIt-has-been-checked-error.png)

从错误的描述我们可以看到，表达式 (getter) 产生的值在其被 checked (Change Detection) 之后发生了改变。Angular 认为这样的行为是不正确的，所以抛出了此异常。

### 此异常来自哪里

正如你所知道的，Angular 在初始化，事件处理，异步请求之后会触发 Change Detection 操作。Change Detection 将对每一个数据绑定重新计算其表达式的值，并与老的值进行比对，如果发现不同，则执行更新操作。在开发模式下时，Angular 在执行完 Change Detection 之后还会执行一个辅助的 check 操作来确保 Change Detection 时得到的新值没有再次发生变化。这里需要强调一下只有开发模式下 Angular 才会执行辅助的 check 操作。在产品模式下 Angular 不会执行它，自然不会抛出此异常。

### 为什么开发模式下 Angluar 要多做一个 check 操作

想象一下，在 Change Detection 的时候某些表达式的值发生了更新，更新的内容已经重新被渲染到了页面上，用户已经可见。这时如果表达式再次发生更新，将导致新的值和页面上的值不一致。当然，Angular 可以再执行一次 Change Detection 去同步这些更新，但是如果这时表达式的值又发生了变化... ...这将导致不停的执行 Change Detection。这种问题在 AngularJS 中常常会碰到，如果感兴趣，可以查看[这里](https://docs.angularjs.org/error/$rootScope/infdig)

Angular 为了避免这个问题，它执行了一个辅助的 check 操作，通知开发者此表达式的值又变了，但是无法同步到页面上。开发者看到这样的异常应该考虑对代码逻辑进行重构。

### 让我们来修复此异常

我们知道原因之后，我们只需要保证在 Change Detection 之后，在辅助的 check 执行之前，此表达式的值不发生改变即可。

```typescript
@Component({
  selector: "app-root",
  template: `
    当前时间戳：
    <span [textContent]="n"></span>
    <button (click)="update()">更新时间戳</button>
  `,
  styles: [],
})
export class AppComponent {
  private v = Date.now();

  get n(): number {
    return this.v;
  }

  update() {
    this.v = Date.now();
  }

  ngOnChanges(): void {
    console.log("=> ngOnChanges()");
  }

  ngOnInit(): void {
    console.log("=> ngOnInit()");
  }

  ngDoCheck(): void {
    console.log("=> ngDoCheck()");
  }

  ngAfterContentInit(): void {
    console.log("=> ngAfterContentInit()");
  }

  ngAfterContentChecked(): void {
    console.log("=> ngAfterContentChecked()");
  }

  ngAfterViewInit(): void {
    console.log("=> ngAfterViewInit()");
  }

  ngAfterViewChecked(): void {
    console.log("=> ngAfterViewChecked()");
  }

  ngOnDestroy(): void {
    console.log("=> ngOnDestroy()");
  }
}
```

如上面的代码所示，我们将时间戳变量的更新放到了 update 方法中，这个问题便得到了解决。

假设有这么一种情况，我希望组件的时间戳变量每秒都被更新，但是只有当我点击 “更新时间戳” 的时候才更新到页面上。我们可能会想到将更新的操作放到一个 Interval 里，代码如下：

```typescript
@Component({
  selector: "app-root",
  template: `
    当前时间戳：
    <span [textContent]="n"></span>
    <button (click)="(0)">更新时间戳</button>
  `,
  styles: [],
})
export class AppComponent {
  private v = Date.now();

  get n(): number {
    return this.v;
  }

  constructor() {
    setInterval(() => {
      this.v = Date.now();
    }, 1000);
  }

  ngOnChanges(): void {
    console.log("=> ngOnChanges()");
  }

  ngOnInit(): void {
    console.log("=> ngOnInit()");
  }

  ngDoCheck(): void {
    console.log("=> ngDoCheck()");
  }

  ngAfterContentInit(): void {
    console.log("=> ngAfterContentInit()");
  }

  ngAfterContentChecked(): void {
    console.log("=> ngAfterContentChecked()");
  }

  ngAfterViewInit(): void {
    console.log("=> ngAfterViewInit()");
  }

  ngAfterViewChecked(): void {
    console.log("=> ngAfterViewChecked()");
  }

  ngOnDestroy(): void {
    console.log("=> ngOnDestroy()");
  }
}
```

这时我们发现页面每秒都在更新，这不是我们想要的。正如我们之前说的，事件处理会触发 Change Detection 的执行，如果我们想让 setInterval 的调用不触发 Change Detection 的执行，我们可以使用 Angular 提供的 NgZone。

```typescript
@Component({
  selector: "app-root",
  template: `
    当前时间戳：
    <span [textContent]="n"></span>
    <button (click)="(0)">更新时间戳</button>
  `,
  styles: [],
})
export class AppComponent {
  private v = Date.now();

  get n(): number {
    return this.v;
  }

  constructor(zone: NgZone) {
    zone.runOutsideAngular(() => {
      setInterval(() => {
        this.v = Date.now();
      }, 1000);
    });
  }

  ngOnChanges(): void {
    console.log("=> ngOnChanges()");
  }

  ngOnInit(): void {
    console.log("=> ngOnInit()");
  }

  ngDoCheck(): void {
    console.log("=> ngDoCheck()");
  }

  ngAfterContentInit(): void {
    console.log("=> ngAfterContentInit()");
  }

  ngAfterContentChecked(): void {
    console.log("=> ngAfterContentChecked()");
  }

  ngAfterViewInit(): void {
    console.log("=> ngAfterViewInit()");
  }

  ngAfterViewChecked(): void {
    console.log("=> ngAfterViewChecked()");
  }

  ngOnDestroy(): void {
    console.log("=> ngOnDestroy()");
  }
}
```

这次正确了，内存中的时间戳变量每秒都在更新，但是并没有触发 Change Detection ，所以页面没用发生变化。当我们点击按钮时才触发 Change Detection 的执行，页面才被刷新。

## 总结

这篇文章是 Angular Change Detection 的第一部分内容，我们接触了 Change Detection ，知道了 ExpressionChangedAfterItHasBeenCheckedError 错误的原因，在第二部分我们将介绍如何控制组件的 Change Detection 。
