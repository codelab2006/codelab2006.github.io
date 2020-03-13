---
title: TypeScript 笔记一（基础类型）
---

TypeScript 提供了七种原始类型，分别是：boolean，number，string，null，undefined，bigint，symbol。

### Boolean

```typescript
let isWinner: boolean = true;
let isLosser: boolean = false;
```

### Number

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

Number 类型存储的数超过了 MAX_SAFE_INTEGER 或者 MIN_SAFE_INTEGER 之后的计算是不准确的。

### String

```typescript
let firstName: string = "Yongjian";
let lastName: string = 'Huang';
let fullName: string = `${firstName} ${lastName}`;

console.log('firstName:', firstName); // firstName: Yongjian
console.log('lastName:', lastName); // lastName: Huang
console.log('fullName:', fullName); // fullName: Yongjian Huang
```

### Null 和 Undefined

TypeScript 中 null 和 undefined 有它们自己的类型。

```typescript
let n: null = null;
let u: undefined = undefined;

n = 123; // error
n = undefined; // error

u = 123; // error
u = null; // error
```

### Bigint

Bigint 类型只能存储整数，Bigint 类型的最大值受内存的限制。

```typescript
let big1: bigint = 100n;
let big2: bigint = 100.2n; // error
```

### Symbol

```typescript
```
