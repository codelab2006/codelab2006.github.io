---
title: Angular Change Detection (Part III)
---

## 一. 前言

类似 Angular，React 的前端框架让我们的前端开发变得高效。而他们都有一个核心的功能：Change Detection。这篇文章主要介绍 Angular 中的 Change Detection，这里并不是带着大家读 Angular 的源代码。而是通过例子让大家理解和掌握如何控制 Angular 中的 Change Detection，这对于前端性能优化很有帮助。本知识点分为三部分，这是第三部分。

## 二. 控制组件的 Change Detection

前面两部分我们对 Change Detection 执行的细节有了一定的了解，接下来我们来学习如何控制组件的 Change Detection。
Angular 为我们提供了 ChangeDetectionStrategy 和 ChangeDetectorRef 两个 API 来帮助我们控制组件的 Change Detection。

### ChangeDetectionStrategy

当我们在使用 @Component 定义组件时，我们可以配置组件的 changeDetection 属性为 ChangeDetectionStrategy.Default 或者 ChangeDetectionStrategy.OnPush。

#### ChangeDetectionStrategy.Default

[ChangeDetectionStrategy.Default](https://angular.io/api/core/ChangeDetectionStrategy#Default) 是 changeDetection 属性的默认值。将使用 CheckAlways 策略，正如我们之前看到的，当 Change Detection 被触发时，每个组件将执行自己的 Change Detection。

#### ChangeDetectionStrategy.OnPush

[ChangeDetectionStrategy.OnPush](https://angular.io/api/core/ChangeDetectionStrategy#OnPush) 将使用 CheckOnce 策略。这个策略使组件在初始时只执行一次 Change Detection。但是也有一些例外的情况。请看下面的例子：

```typescript
@Component({
  selector: "app-root",
  template: `
    <div>
      app component: <span [textContent]="message?.content"></span>
      <button (click)="updateContent()">
        update message content from app-root
      </button>
      <button (click)="updateMessage()">
        update message object from app-root
      </button>
    </div>
    <app-message [message]="message"></app-message>
  `,
  styles: [],
})
export class AppComponent {
  message: Message = { content: "Hello World" };

  updateContent(): void {
    this.message.content = "Hello angular";
  }

  updateMessage(): void {
    this.message = { content: "Hello angular" };
  }
}

export interface Message {
  content: string;
}

@Component({
  selector: "app-message",
  template: `
    <div>
      message component (OnPush):
      <span [textContent]="message?.content"></span>
      <span [textContent]="observable && observable | async"></span>
      <button (click)="updateContent()">
        update message content from app-message
      </button>
      <button (click)="updateMessage()">
        update message object from app-message
      </button>
      <button (click)="updateContentTimeout()">
        update message content from app-message (timeout)
      </button>
      <button (click)="updateContentTimer()">
        update message content from app-message (timer)
      </button>
    </div>
    <app-child [message]="message"></app-child>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [],
})
export class MessageComponent {
  @Input()
  message: Message = null;

  observable: Observable<any> = null;

  constructor() {}

  updateContent(): void {
    this.message.content = "Hello angular";
  }

  updateMessage(): void {
    this.message = { content: "Hello angular" };
  }

  updateContentTimeout(): void {
    setTimeout(() => {
      this.message.content = "Hello angular timeout";
    }, 1000);
  }

  updateContentTimer(): void {
    this.observable = timer(1000).pipe(
      map(() => {
        this.message.content = "Hello angular timer";
        return "Hello angular timer";
      })
    );
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    console.log("message -> ngOnChanges", simpleChanges);
  }

  ngOnInit() {
    console.log("message -> ngOnInit");
  }

  ngDoCheck() {
    console.log("message -> ngDoCheck");
  }

  ngAfterContentInit() {
    console.log("message -> ngAfterContentInit");
  }

  ngAfterContentChecked() {
    console.log("message -> ngAfterContentChecked");
  }

  ngAfterViewInit() {
    console.log("message -> ngAfterViewInit");
  }

  ngAfterViewChecked() {
    console.log("message -> ngAfterViewChecked");
  }

  ngOnDestroy() {
    console.log("message -> ngOnDestroy");
  }
}

@Component({
  selector: "app-child",
  template: `
    <div>
      child component:
      <span [textContent]="message?.content"></span>
      <button (click)="updateContent()">
        update message content from app-child
      </button>
      <button (click)="updateMessage()">
        update message object from app-child
      </button>
    </div>
  `,
  styles: [],
})
export class ChildComponent {
  @Input()
  message: Message = null;

  constructor() {}

  updateContent(): void {
    this.message.content = "Hello angular";
  }

  updateMessage(): void {
    this.message = { content: "Hello angular" };
  }
}
```

如果你运行上面的例子代码，你会发现在以下几种情况下，设置为 OnPush 的 Message 组件任然会执行自己的 Change Detection。

1. 输入参数引用发生变化。

2. 组件内部触发 DOM 事件，例如组件内部按钮被点击。

3. 触发通过 Async 管道订阅了 observable 事件。

OnPush 的这些细小的陷阱让我们在使用时应该加倍小心。特别是在使用 OnPush 跳过重型组件，进行性能优化的时候。我们应该通过测试反复确认 Change Detection 是否正如我们期望的方式执行。

### ChangeDetectorRef

除了在组件定义时配置 Change Detection 策略之外，我们也可以使用 ChangeDetectorRef 控制组件是否执行 Change Detection。ChangeDetectorRef 包括以下主要的方法:

1. markForCheck，markForCheck 要配合 OnPush 使用。正如上面的例子，在使用 OnPush 的情况下，timer 不会触发组件的 Change Detection。但是如果我们在 timer 的 callback 中调用了 markForCheck，这时将触发组件的 Change Detection。

2. detach 和 reattach，detach 将组件从 Change Detection Tree 中剥离。剥离后组件就不会执行 Change Detection。reattach 将组件重新挂载到 Change Detection Tree。这样在 Change Detection 被触发时，组件将执行自己的 Change Detection。

3. detectChanges，detectChanges 让从 Change Detection Tree 中剥离的组件执行一个 local 的 Change Detection。

ChangeDetectionStrategy 和 ChangeDetectorRef 都可以帮我们 enable 或者 disable 组件的 Change Detection，是很好的性能优化的手段。与使用 ChangeDetectionStrategy 相比使用 ChangeDetectorRef 更容易控制组件的 Change Detection 的执行。
