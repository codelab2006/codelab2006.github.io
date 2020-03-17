---
title: TypeScript 笔记二（接口）
---

### 我们的第一个接口

TypeScript 类型检查的重点在于检查值的“形状”，接口扮演着命名类型的角色。我们先来看看接口是如何工作的。

```typescript
interface ShowableText {
  v: string;
}

function showText(o: ShowableText) {
  console.log(o.v); // World
}

let obj = { x: 123, y: 'Hello', z: true, v: 'World' };
showText(obj);
```

从上面的例子可以发现，虽然对象 obj 除了 v 属性以外，还有 x，y，z 属性，但是 showText 方法还是能接受 obj 作为参数。因为 showText 函数接受的参数的“形状”只需要有一个 v 属性。
