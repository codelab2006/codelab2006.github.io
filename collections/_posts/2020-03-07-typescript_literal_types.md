---
title: TypeScript 笔记七（字面类型）
---

### 字面类型

```typescript
let helloWorld = 'Hello World'; // string type
const HELLO_WORLD = 'Hello World'; // 'Hello World' type
```

### 字符串字面类型

```typescript
type Easing = 'ease-in' | 'ease-out' | 'ease-in-out';
function animate(easing: Easing) {}
animate('ease-in');
animate('ease-out');
animate('ease-in-out');
animate('xxx'); // Error
```

### 数字字面类型

```typescript
let v1: 1 | 2 | 3 | 4 = 1;
let v2: 1 | 2 | 3 | 4 = 2;
let v3: 1 | 2 | 3 | 4 = 3;
let v4: 1 | 2 | 3 | 4 = 4;
let v5: 1 | 2 | 3 | 4 = 5; // Error
```
