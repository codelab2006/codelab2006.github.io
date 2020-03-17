---
title: TypeScript 笔记一（基础类型）
---

### 原始类型

TypeScript 提供了七种原始类型，分别是：boolean，number，string，null，undefined，bigint，symbol。

#### Boolean

```typescript
let isWinner: boolean = true;
let isLosser: boolean = false;
```

#### Number

```typescript
let binary: number = 0b10;
let octal: number = 0o10;
let decimal: number = 10;
let hex: number = 0x10;

let float: number = 10.101010;

console.log(binary, octal, decimal, hex, float); // 2 8 10 16 10.10101

console.log(Number.MIN_VALUE); // 5e-324
console.log(Number.MIN_VALUE - 1); // -1
console.log(Number.MAX_VALUE); // 1.7976931348623157e+308
console.log(Number.MAX_VALUE + 1); // 1.7976931348623157e+308

console.log(Number.MIN_SAFE_INTEGER); // -9007199254740991
console.log(Number.MIN_SAFE_INTEGER - 1); // 9007199254740992
console.log(Number.MIN_SAFE_INTEGER - 1 === Number.MIN_SAFE_INTEGER - 2); // true

console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991
console.log(Number.MAX_SAFE_INTEGER + 1); // 9007199254740992
console.log(Number.MAX_SAFE_INTEGER + 1 === Number.MAX_SAFE_INTEGER + 2); // true
```

*Number 类型存储的数超过了 MAX_SAFE_INTEGER 或者 MIN_SAFE_INTEGER 之后的计算是不准确的。*

#### String

```typescript
let firstName: string = 'Yongjian';
let lastName: string = "Huang";
let fullName: string = `${firstName} ${lastName}`;

console.log('firstName:', firstName); // firstName: Yongjian
console.log('lastName:', lastName); // lastName: Huang
console.log('fullName:', fullName); // fullName: Yongjian Huang
```

#### Null 和 Undefined

TypeScript 中 null 和 undefined 有它们自己的类型。null 和 undefined 类型是其他类型的子类，意味着你可以将 null 和 undefined 赋值给其他任何类型。注意当 --strictNullChecks 标记被使用时，null 和 undefined 只能被赋值给 any 和他们自己的类型。

```typescript
let n: null = null;
let u: undefined = undefined;

n = 123; // error
n = undefined; // error

u = 123; // error
u = null; // error
```

#### Bigint

Bigint 类型只能存储整数，Bigint 类型的最大值受内存的限制。

```typescript
let big1: bigint = 100n;
let big2: bigint = 100.2n; // error
```

#### Symbol

Symbol 类型的值是不变且唯一的，可以作为属性名使用。

```typescript
let symbol = Symbol();
let symbolKey = Symbol('key');

const x = Symbol();
class C {
  [x]: string = 'Hello';
}
const c: C = new C();
console.log(c[x]); // Hello

const o = Symbol();
let obj = {
  [o]: 'World'
};
console.log(obj[o]); // World
```

### 其他类型

除了七种原始类型，TypeScript 还提供了 Array，Tuple，Enum，Any，Void，Never，Object 类型。

#### Array

声明一个 Array 类型的变量可以有两种写法。

```typescript
let numbers: number[] = [1, 2, 3, 4, 5];
let numbers: Array<number> = [1, 2, 3, 4, 5];
```

#### Tuple

Tuple 类型允许你用来代表一个元素类型和数量固定的数组。

```typescript
let x: [string, number] = ['xxx', 10];
x = [10, 'ooo']; // Error
```

#### Enum

枚举类型可以用来命名数字值集。默认情况下，枚举类型的值从 0 开始，你也可以手动设置为任何值。

```typescript
enum Color {
  Red,
  Green,
  Blue
}
let c: Color = Color.Red;
console.log(c); // 0

enum Color {
  Red = 100,
  Green,
  Blue = 1000
}
console.log(Color.Green); // 101
console.log(Color.Blue); // 1000
```

一个更有用的功能，你可以从数字得到对应的名字。

```typescript
enum Color {
  Red = 100,
  Green,
  Blue = 1000
}
console.log(Color[1000]); // Blue
```

#### Any

在开发时我们有时可能需要声明一个我们不知道具体类型变量。通常这个变量用来存储动态生成的内容，例如从第三方库返回的内容。这时 any 类型可以帮助我们跳过编译时检查。

```typescript
let notSure: any;
notSure = 6; // number
notSure = 'maybe a string'; // string
notSure = true; // boolean
```

#### Void

通常 void 类型在声明一个没有返回值的函数时使用。

```typescript
function fun(): void {
  console.log('...');
}
```

#### Never

通常 never 类型用来表示抛出异常的函数或永远无法返回的函数的返回类型。

```typescript
function throwError(message: string): never {
  throw new Error(message);
}

function infiniteLoop(): never {
  while (true) { }
}
```

#### Object

object 是代表非原始类型的类型。

```typescript
let o = { property: 'value' };
let x = Object.create(o);
```

### Type assertions

类似于其他语言中的强制类型转换，但不对数据进行任何特殊检查或重组。有两种写法。

```typescript
let someValue: any = 'this is a string';
let strLength: number = (<string>someValue).length;
let strLength: number = (someValue as string).length;
```
