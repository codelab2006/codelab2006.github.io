---
tutorial: typescript
title: TypeScript 变量声明
order: 2
---

### 使用 var 声明变量（不建议使用此方式）

```typescript
var x = 100;
```

使用 var 声明变量会发生变量提升的现象，没有块级作用域，容易引起一些不易发现的问题

### 使用 let 声明变量（建议使用此方式）

```typescript
let x = 100;
```

使用 let 声明变量不会发生变量提升，而且是块级作用域

### 使用 const 声明常量

```typescript
const c = 100;
```

使用 const 声明时必须指定初始值，声明的常量不允许被再次赋值

如果初始值是一个对象，对象的属性任然可以被修改

### 解构赋值

#### 数组的解构

```typescript
let array = [1, 2, 3, 4];
let [a, b] = array;
console.log(a, b); // 1 2

[b, a] = [a, b];
console.log(a, b); // 2 1

(function f([a, b]: number[]) {
  console.log(a, b); // 1 2
})(array);

let [aa, ...bb] = array;
console.log(aa, bb); // 1 [2, 3, 4]

let [, bbb, ccc] = array;
console.log(bbb, ccc); // 2 3
```

#### Tuple 的解构

```typescript
```

#### 对象的解构

```typescript
```

#### 使用默认值

```typescript
```

#### Spread

```typescript
```
