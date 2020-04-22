---
title: TypeScript 笔记一（Basic Types）
---

### Boolean

boolean 类型只有两个值：true / false。

```typescript
const isDone: boolean = true;
```

### Number

和 JavaScript 一样，所有的数字都是浮点值。

```typescript
let binary: number = 0b10;
let octal: number = 0o10;
let decimal: number = 10;
let hex: number = 0x10;
```

### String

TypeScript 中的字符串可以使用（''）或者（""）表示。TypeScript 还支持模板字符串，模板字符串中可以有嵌入的表达式，使用（``）表示。

```typescript
const firstName: string = 'Yongjian';
const lastName: string = "Huang";
const fullName: string = `${firstName} ${lastName}`;
```

### Array

TypeScript 中声明数组类型有两种写法。

```typescript
let list1: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3];
```

### Tuple

元组类型允许您用固定数量的元素表示数组。

```typescript
let x: [string, number];
x = ["TypeScript", 10];
```

### Enum

枚举类型可以用来为数字集合取一个友好的名字。默认数字从 0 开始，你也可以手动设置此初始值，或者手动设置所有的值。

```typescript
enum Color {
  Red,
  Green,
  Blue,
}
let c: Color = Color.Green;

enum Color {
  Red = 1,
  Green,
  Blue,
}
let c: Color = Color.Green;

enum Color {
  Red = 1,
  Green = 2,
  Blue = 4,
}
let c: Color = Color.Green;
```

你也可以通过数字获取其名字。

```typescript
enum Color {
  Red = 1,
  Green,
  Blue,
}
let colorName: string = Color[2];
```

### Any

有时你可能需要声明一个你不知道具体类型的变量来存储动态生成的值，或者第三方库提供给你的值，这时可以使用 any 类型。

```typescript
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false;
```

### Void

一般在声明没有返回值的函数时使用。

```typescript
function warnUser(): void {
  console.log("This is my warning message");
}
```

### Null and Undefined

在 TypeScript 中 null 和 undefined 有它们自己的类型 null 和 undefined。默认情况下，null 和 undefined 是其他所有类型的子类，所以你可以将其赋值给其他任何类型。但是，当使用 strictNullChecks 标志时，null 和 undefined 仅可赋值给 any 类型及其各自的类型（一个例外是 undefined 也可分配给 void）。

```typescript
let u: undefined = undefined;
let n: null = null;
```

### Never

never 类型在声明永远不会返回的函数，或者抛出异常的函数时作为函数的返回值类型使用。

```typescript
function infiniteLoop(): never {
  while (true) {}
}

function error(message: string): never {
  throw new Error(message);
}

function fail() {
  return error("Something failed");
}
```

### Object

object 类型代表了非原始类型的类型，即不是 number，string，boolean，bigint，symbol，null，or undefined 的任何类型。

```typescript
const o: object = {};
```

### Type assertions

TypeScript 中的类型断言类似其他语言中的强制类型转换，只是被编译时使用。有两种写法，但是在使用了 JSX 时，只能使用第二种写法。

```typescript
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;

let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
```
