---
title: TypeScript 笔记八（Unions）
---

### Union Types

```typescript
let v: number | string | boolean;
v = 100;
v = "abc";
v = true;
v = []; // Error

class CA {
  ca() {}
  play() {}
}
class CB {
  cb() {}
  play() {}
}
function builder(): CA | CB {
  return new CA();
}
let i: CA | CB = builder();
i.play();
i.ca(); // Error
i.cb(); // Error
```
