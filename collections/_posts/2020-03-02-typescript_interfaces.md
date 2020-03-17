---
title: TypeScript 笔记二（接口）
---

### 我们的第一个接口

TypeScript 类型检查的重点在于检查值的“形状”，接口扮演着命名类型的角色。我们先来看看接口是如何工作的。

```typescript
interface ShowableText {
  v: string;
}

function showText(o: ShowableText) {
  console.log(o.v);
}

let obj = { x: 123, y: 'Hello', z: true, v: 'World' };
showText(obj); // World
```

从上面的例子可以发现，虽然对象 obj 除了 v 属性以外，还有 x，y，z 属性，但是 showText 方法还是能接受 obj 作为参数。因为 showText 函数接受的参数的“形状”只需要有一个 v 属性，而 obj 正好有这个属性。

我们还可以使用匿名的接口

```typescript
function showText(o: { v: string }) {
  console.log(o.v);
}

let o = { x: 123, y: 'Hello', z: true, v: 'World' };
showText(o); // World
let x = { x: 123, y: 'Hello', z: true };
showText(x); // Error
```

### 可选的属性

你可以在接口中声明可选的属性。

```typescript
interface Config {
  xxx?: string;
  ooo?: string;
}
function setConfig(c: Config): void {
  // ...
}
setConfig({ xxx: 'xxx' });
```

### 只读属性

你可以在接口中声明只读属性，只读属性只能在对象被创建的时候修改。

```typescript
interface Point {
  readonly x: number;
  readonly y: number;
}
let point: Point = { x: 2, y: 4 };
point.x = 200; // Error
```

### 方法类型

可以使用接口描述一个方法类型。

```typescript
interface Callback {
  (x: string, o: number): void;
}

let callback: Callback = (xxx: string, ooo: number): void => {
  console.log(xxx, ooo);
};
callback('abc', 123); // abc 123
```

### 可索引类型

```typescript
interface StringIndexable {
  [index: number]: string;
}

let si: StringIndexable = ['AAA', 'BBB', 'CCC'];
console.log(si[0], si[1], si[2]);

interface NumberIndexable {
  [index: string]: number;
}

let ni: NumberIndexable = { 'AAA': 1, 'BBB': 2, 'CCC': 3 };
console.log(ni['AAA'], ni['BBB'], ni['CCC']);
```

索引的类型只能是 number 或 string 类型。如果 number 和 string 索引同时存在，则 number 索引的值类型必须是 string 索引的值类型的子类。

```typescript
class Parent {
  p: string = 'Hello';
}
class Child extends Parent {
  c: string = 'World';
}
interface Indexable1 {
  [index: number]: Child;
  [index: string]: Parent;
}
interface Indexable2 {
  [index: number]: Parent; // Error
  [index: string]: Child;
}
```

### Class 类型

Class 类型类似于其他语言中的 Class 类型。

#### 实现接口

```typescript
interface Renderable {
  color: string;
  render(): void;
}

class Picture implements Renderable {
  color: string = 'red';
  render(): void { throw new Error("Method not implemented."); }
}
```

#### 类的静态端和实例端

```typescript
interface RenderableConstructor {
  new(color: string): Renderable;
}

interface Renderable {
  color: string;
  render(): void;
}

class Background implements Renderable {
  color: string = 'white';
  render(): void { console.log('color', this.color); }
  constructor(color: string) {
    this.color = color;
  }
}

class Picture implements Renderable {
  color: string = 'red';
  render(): void { console.log('color', this.color); }
  constructor(color: string) {
    this.color = color;
  }
}

function create(renderableConstructor: RenderableConstructor,
  color: string): Renderable {
  return new renderableConstructor(color);
}

let background: Renderable = create(Background, 'black');
let picture: Picture = create(Picture, 'white');
background.render();
picture.render();
```
