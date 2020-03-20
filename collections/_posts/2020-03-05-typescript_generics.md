---
title: TypeScript 笔记五（泛型）
---

### 泛型方法

```typescript
function identity<T>(arg: T): T { return arg; }
let stringId = identity<string>('abc');
let numberId = identity<number>(123);
```

我们也可以声明泛型方法的类型。

```typescript
function identity<T>(arg: T): T { return arg; }
let t: <T>(arg: T) => T = identity;
let u: <U>(arg: U) => U = identity;
let o: { <K>(arg: K): K } = identity;

interface GenericIdentityInterface { <N>(arg: N): N }
let n: GenericIdentityInterface = identity;

interface GenericIdentity<M> { (arg: M): M; }
let numberIdentity: GenericIdentity<number> = identity;
numberIdentity(12345);
numberIdentity('abc'); // Error
```

### 泛型类

```typescript

```
