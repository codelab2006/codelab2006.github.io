---
tutorial: typescript
title: TypeScript 数据类型
order: 1
---

### Boolean

```typescript
let isXXX: boolean = true;
console.log(isXXX); // true
```

### Number

```typescript
let binaryCount: number = 0b10;
let octalCount: number = 0o10;
let decimalCount: number = 10;
let hexadecimalCount: number = 0xf;
console.log(binaryCount, octalCount, decimalCount, hexadecimalCount); // 2 8 10 15
```

### String

```typescript
let name: string = "Yongjian";
let message: string = `I'm ${name}`;
console.log(message); // I'm Yongjian
```

### Array

```typescript
let list1: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3];
console.log(list1.concat(list2)); // [1, 2, 3, 1, 2, 3]
```

### Tuple

```typescript
let v: [string, number] = ["string", 100];
console.log(v); // ["string", 100]
```

### Enum

```typescript
enum Color {
  Red,
  Green,
  Blue
}
let color: Color = Color.Green;
console.log(color); // 1

enum Type {
  AAA = 100,
  BBB,
  CCC
}
let type: Type = Type.AAA;
console.log(type); // 100

let typeName: string = Type[102];
console.log(typeName); // CCC
```

### Any

```typescript
let x: any = 100;
x = "Hello";
x = true;
x = [];

let array: any[] = [1, "2", true];
```

### Void

```typescript
function functionName(): void {}
```

### Null and Undefined

```typescript
let u: undefined = undefined;
let n: null = null;

let s: string | null | undefined = null; // note: strictNullChecks flag
```

### Never

```typescript
function error(message: string): never {
  throw new Error(message);
}

function infiniteLoop(): never {
  while (true) {}
}
```

### Object

除原始类型 number, string, boolean, bigint, symbol, null, or undefined 以外的都是 object 类型

### 类型转换

```typescript
let someValue: any = "string";
let strLength: number = (<string>someValue).length;

let someValue: any = "string";
let strLength: number = (someValue as string).length;
```
