---
title: TypeScript 笔记九（高级类型）
---

### 使用 in

```typescript
let n = 'aaa';
let m = 'bbb';
let o = { aaa: 123 };
if (n in o) {
  console.log('Hello');
}
if (!(m in o)) {
  console.log('World');
}
```

### 使用 typeof

```typescript
function padLeft(value: string, padding: string | number) {
  if (typeof padding === 'number') return Array(padding + 1).join(' ') + value;
  if (typeof padding === 'string') return padding + value;
  throw new Error(`Expected string or number, got '${padding}'.`);
}
console.log(
  typeof 123,
  typeof 'abc',
  typeof true,
  typeof null,
  typeof undefined,
  typeof [],
  typeof {},
  typeof (() => {})
);
// number string boolean object undefined object object function
```

### 使用 instanceof

```typescript
interface Padder {
  getPaddingString(): string;
}

class SpaceRepeatingPadder implements Padder {
  constructor(private numSpaces: number) {}
  getPaddingString() {
    return Array(this.numSpaces + 1).join(' ');
  }
}

class StringPadder implements Padder {
  constructor(private value: string) {}
  getPaddingString() {
    return this.value;
  }
}

function getRandomPadder() {
  return Math.random() < 0.5
    ? new SpaceRepeatingPadder(4)
    : new StringPadder('  ');
}
let padder: Padder = getRandomPadder();
if (padder instanceof SpaceRepeatingPadder) padder;
if (padder instanceof StringPadder) padder;
```

### 类型别名

```typescript
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
  if (typeof n === 'string') return n;
  else return n();
}

type Container<T> = { value: T };
type Tree<T> = {
  value: T;
  left: Tree<T>;
  right: Tree<T>;
};
type LinkedList<T> = T & { next: LinkedList<T> };
interface Person {
  name: string;
}
var people: LinkedList<Person>;
var s = people.name;
var s = people.next.name;
var s = people.next.next.name;
var s = people.next.next.next.name;

class Person {
  constructor() {}
}
type P = Person;
let p: P = new Person();
```

### 索引类型

```typescript
function pluck<T, K extends keyof T>(o: T, propertyNames: K[]): T[K][] {
  return propertyNames.map(n => o[n]);
}
interface Car {
  manufacturer: string;
  model: string;
  year: number;
}
let taxi: Car = {
  manufacturer: 'Toyota',
  model: 'Camry',
  year: 2014
};
let makeAndModel: string[] = pluck(taxi, ['manufacturer', 'model']);
let modelYear = pluck(taxi, ['model', 'year']);
```

### 映射类型

```typescript
interface PersonPartial {
  name?: string;
  age?: number;
}
type Partial<T> = {
  [P in keyof T]?: T[P];
};

interface PersonReadonly {
  readonly name: string;
  readonly age: number;
}
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Keys = 'option1' | 'option2';
type Flags = { [K in Keys]: boolean };
type Flags = {
  option1: boolean;
  option2: boolean;
};

type Nullable<T> = { [P in keyof T]: T[P] | null };
type Partial<T> = { [P in keyof T]?: T[P] };
```

### 条件类型

```typescript
// TODO ...
```
