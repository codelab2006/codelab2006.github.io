---
title: Angular Change Detection (Part II)
---

## 一. 前言

类似 Angular，React 的前端框架让我们的前端开发变得高效。而他们都有一个核心的功能：Change Detection。这篇文章主要介绍 Angular 中的 Change Detection，这里并不是带着大家读 Angular 的源代码。而是通过例子让大家理解和掌握如何控制 Angular 中的 Change Detection，这对于前端性能优化很有帮助。本知识点分为三部分，这是第二部分。

## 二. 深入 Change Detection 和 ExpressionChangedAfterItHasBeenCheckedError

在第一部分的 ExpressionChangedAfterItHasBeenCheckedError 小节中，我们的 getter 每次返回当前的时间戳，导致 ExpressionChangedAfterItHasBeenCheckedError 异常被抛出。但是有时我们发现我们在组件的 ngAfterViewInit 和 ngAfterViewChecked 方法中修改了绑定的属性，也会导致此异常被抛出。接下来我们就来分析一下其中的原因。我们先看以下代码：

```typescript
import { Component, SimpleChanges } from "@angular/core";

@Component({
  selector: "app-root",
  template: `<span [textContent]="n"></span>`,
  styles: [],
})
export class AppComponent {
  n = 0;
  ngOnChanges(simpleChanges: SimpleChanges) {
    this.n += 1;
    console.log("app -> ngOnChanges", simpleChanges, this.n);
  }

  ngOnInit() {
    this.n += 10;
    console.log("app -> ngOnInit", this.n);
  }

  ngDoCheck() {
    this.n += 100;
    console.log("app -> ngDoCheck", this.n);
  }

  ngAfterContentInit() {
    this.n += 1000;
    console.log("app -> ngAfterContentInit", this.n);
  }

  ngAfterContentChecked() {
    this.n += 10000;
    console.log("app -> ngAfterContentChecked", this.n);
  }

  ngAfterViewInit() {
    this.n += 100000;
    console.log("app -> ngAfterViewInit", this.n);
  }

  ngAfterViewChecked() {
    this.n += 1000000;
    console.log("app -> ngAfterViewChecked", this.n);
  }

  ngOnDestroy() {
    this.n += 10000000;
    console.log("app -> ngOnDestroy", this.n);
  }
}
```

我们在浏览器中打开我们的页面，运行结果如下：

![screenshot](/assets/images/expression-changed-afterIt-has-been-checked-error-II.png)

从截图中可以看到，有两个 ExpressionChangedAfterItHasBeenCheckedError 异常被抛出，这里我们只看第一个异常，第二个异常和第一个类似。我们从第一个异常的描述中看到：“ Previous value for 'textContent': '11110'. Current value: '1111110' ”。这说明辅助的 check 比较的两个值分别是 11110 和 1111110，而 11110 是在执行 ngAfterContentChecked 方法时所产生的值。这说明在 ngAfterContentChecked 方法执行之后，Angular 已经将属性 n 的值渲染到页面上。之后在 ngAfterViewInit，ngAfterViewChecked 方法中对 n 的更新，在 Angular 看来是不正确的。为了验证我们的假设，我们来看看 Angular 源码中的 refreshView 方法：

```typescript
function refreshView<T>(
  tView: TView,
  lView: LView,
  templateFn: ComponentTemplate<{}> | null,
  context: T
) {
  ... ...
  try {
    ... ...

    // 这里将执行 OnInit, OnChanges, DoCheck 方法
    // execute pre-order hooks (OnInit, OnChanges, DoCheck)
    // PERF WARNING: do NOT extract this to a separate function without running benchmarks
    if (!checkNoChangesMode) {
      if (hooksInitPhaseCompleted) {
        const preOrderCheckHooks = tView.preOrderCheckHooks;
        if (preOrderCheckHooks !== null) {
          executeCheckHooks(lView, preOrderCheckHooks, null);
        }
      } else {
        const preOrderHooks = tView.preOrderHooks;
        if (preOrderHooks !== null) {
          executeInitAndCheckHooks(
            lView,
            preOrderHooks,
            InitPhaseState.OnInitHooksToBeRun,
            null
          );
        }
        incrementInitPhaseFlags(lView, InitPhaseState.OnInitHooksToBeRun);
      }
    }

    ... ...

    // 这里将执行 AfterContentInit, AfterContentChecked 方法
    // execute content hooks (AfterContentInit, AfterContentChecked)
    // PERF WARNING: do NOT extract this to a separate function without running benchmarks
    if (!checkNoChangesMode) {
      if (hooksInitPhaseCompleted) {
        const contentCheckHooks = tView.contentCheckHooks;
        if (contentCheckHooks !== null) {
          executeCheckHooks(lView, contentCheckHooks);
        }
      } else {
        const contentHooks = tView.contentHooks;
        if (contentHooks !== null) {
          executeInitAndCheckHooks(
            lView,
            contentHooks,
            InitPhaseState.AfterContentInitHooksToBeRun
          );
        }
        incrementInitPhaseFlags(
          lView,
          InitPhaseState.AfterContentInitHooksToBeRun
        );
      }
    }

    ... ...

    // 这里将触发页面刷新
    // Refresh child component views.
    const components = tView.components;
    if (components !== null) {
      refreshChildComponents(lView, components);
    }

    ... ...

    // 这里将执行 AfterViewInit, AfterViewChecked 方法
    // execute view hooks (AfterViewInit, AfterViewChecked)
    // PERF WARNING: do NOT extract this to a separate function without running benchmarks
    if (!checkNoChangesMode) {
      if (hooksInitPhaseCompleted) {
        const viewCheckHooks = tView.viewCheckHooks;
        if (viewCheckHooks !== null) {
          executeCheckHooks(lView, viewCheckHooks);
        }
      } else {
        const viewHooks = tView.viewHooks;
        if (viewHooks !== null) {
          executeInitAndCheckHooks(
            lView,
            viewHooks,
            InitPhaseState.AfterViewInitHooksToBeRun
          );
        }
        incrementInitPhaseFlags(
          lView,
          InitPhaseState.AfterViewInitHooksToBeRun
        );
      }
    }
    ... ...
  } finally {
    leaveView();
  }
}
```

这里移除了一些我们目前并不关心的代码，我们可以看到最先执行的是 OnInit, OnChanges, DoCheck，其次是 AfterContentInit, AfterContentChecked，然后将触发页面的刷新，最后执行 AfterViewInit, AfterViewChecked。这就解释了为什么在 AfterViewInit, AfterViewChecked 方法中修改了绑定的属性，也会导致此异常被抛出。所以这里我们可以更加准确的描述，如果我们想避免 ExpressionChangedAfterItHasBeenCheckedError 异常，我们需要保证在 Change Detection 过程中，在页面刷新之后，在辅助的 check 执行之前，表达式的值不发生改变。

这里我们还验证了一点，页面刷新是在 AfterViewInit, AfterViewChecked 方法执行之前发生。
