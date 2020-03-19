---
title: TypeScript 笔记四（方法）
---

### Functions

类似 JavaScript，在 TypeScript 中也可以创建命名的方法和匿名的方法。

```typescript
function namedFunction(): void {}
const v = function(): void {};
```

### 方法类型

```typescript
let init: (x: string, y: number, z: boolean) => boolean;
init = function(xxx: string, yyy: number, zzz: boolean) {
  return true;
};
```

### 可选的，默认的方法参数

参数不能既是可选的，又是默认的。

```typescript
let init: (x: string, y: number, z?: boolean) => boolean;
init = function(xxx: string, yyy: number, zzz?: boolean) {
  return true;
};

let init: (x: string, y: number, z?: boolean) => boolean;
init = function(xxx: string, yyy: number, zzz: boolean = true) {
  return true;
};
```

### Rest 参数

```typescript
function buildMessage(message: string, ...rest: any[]): string {
  return `${message}: ${rest.join(',')}`;
}
```

### This

```typescript
let o = {
  name: 'World',
  say: function() {
    console.log('Hello', this.name);
  }
};
let s = o.say;
o.say(); // Hello World
s(); // Cannot read property 'name' of undefined
```

报错的原因是因为对象 o 的 say 方法中使用了 this，我们将对象 o 的 say 方法赋给了一个变量 s，并且单独调用了 s。这时的 this 是顶层对象。（在严格模式下，这时的 this 对象是 undefined）
可以转换成一个箭头函数来引用正确的 this 对象。

```typescript
let o = {
  name: 'World',
  say: function() {
    return () => {
      console.log('Hello', this.name);
    };
  }
};
let s = o.say();
o.say()(); // Hello World
s(); // Hello World
```

### 重载

```typescript
let suits = ['hearts', 'spades', 'clubs', 'diamonds'];

function pickCard(x: { suit: string; card: number }[]): number;
function pickCard(x: number): { suit: string; card: number };
function pickCard(x: string | number | any[]): any {
  if (typeof x == 'object') {
    let pickedCard = Math.floor(Math.random() * x.length);
    return pickedCard;
  } else if (typeof x == 'number') {
    let pickedSuit = Math.floor(x / 13);
    return { suit: suits[pickedSuit], card: x % 13 };
  }
}
let myDeck = [
  { suit: 'diamonds', card: 2 },
  { suit: 'spades', card: 10 },
  { suit: 'hearts', card: 4 }
];
let pickedCard1 = myDeck[pickCard(myDeck)];
alert('card: ' + pickedCard1.card + ' of ' + pickedCard1.suit);
let pickedCard2 = pickCard(15);
alert('card: ' + pickedCard2.card + ' of ' + pickedCard2.suit);
```
