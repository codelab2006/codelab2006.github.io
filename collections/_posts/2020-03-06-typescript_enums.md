---
title: TypeScript 笔记六（枚举）
---

### 数字枚举

```typescript
enum Direction {
  Up,
  Down,
  Left,
  Right
}

function getValue(): number {
  return 100;
}

enum E1 {
  A,
  B = getValue()
}

enum E2 {
  A = getValue(),
  B // Error
}
```

### 字符串枚举

```typescript
enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT'
}
```

### 计算成员和常数成员

```typescript
enum FileAccess {
  None,
  Read = 1 << 1,
  Write = 1 << 2,
  ReadWrite = Read | Write,
  G = '123'.length
}
```

### 常量枚举

常量枚举在编译期间会被完全删除。

```typescript
const enum Enum {
  A = 1,
  B = A * 6
}
let v: Enum[] = [Enum.A, Enum.B];
// let v = [1 /* A */, 6 /* B */];

const enum SEnum {
  A = 'AAA',
  B = 'BBB'
}
let sv: SEnum[] = [SEnum.A, SEnum.B];
// let sv = ['AAA' /* A */, 'BBB' /* B */];

const enum Directions {
  Up,
  Down,
  Left,
  Right
}
let directions = [
  Directions.Up,
  Directions.Down,
  Directions.Left,
  Directions.Right
];
let directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];
```

### 环境枚举

环境枚举用于描述已经存在的枚举类型的形状。

```typescript
declare enum Enum {
  A = 1,
  B,
  C = 2
}
let v: Enum = Enum.A;
```
