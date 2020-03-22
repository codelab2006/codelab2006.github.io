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
class GenericClass<T> {
    v: T;
    xxx: (x: T, y: T) => T;
}
```

### 泛型约束

泛型约束就是对这个 T 增加了一些限制。

```typescript
interface Lengthwise { length: number; }
function loggingIdentity<T extends Lengthwise>(arg: T): T { return arg; }

function getProperty<T, K extends keyof T>(obj: T, key: K) { return obj[key]; }
```

### 使用 Class 类型

```typescript
class BeeKeeper { hasMask: boolean; }
class ZooKeeper { nametag: string; }
class Animal { numLegs: number; }
class Bee extends Animal { keeper: BeeKeeper; }
class Lion extends Animal { keeper: ZooKeeper; }
function createInstance<A extends Animal>(c: new () => A): A { return new c(); }

createInstance(Lion).keeper.nametag;
createInstance(Bee).keeper.hasMask;
```
