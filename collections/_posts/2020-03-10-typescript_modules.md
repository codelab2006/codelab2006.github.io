---
title: TypeScript 笔记十（模块）
---

### 介绍

从 ECMAScript 2015 开始, JavaScript 有了模块的概念，TypeScript 也具有这个概念。模块中的代码在自己的作用域中执行，不在全局作用域中执行，意味着模块中声明的变量，方法，类，在模块外是不可见的。你需要将明确的将它们导出，并在使用的模块中进行导入。

### Export

```typescript
// StringValidator.ts
export interface StringValidator {
  isAcceptable(s: string): boolean;
}

// ZipCodeValidator.ts
import { StringValidator } from './StringValidator';

export const numberRegexp = /^[0-9]+$/;

export class ZipCodeValidator implements StringValidator {
  isAcceptable(s: string) {
    return s.length === 5 && numberRegexp.test(s);
  }
}
```

#### 重命名导出

```typescript
class ZipCodeValidator implements StringValidator {
  isAcceptable(s: string) {
    return s.length === 5 && numberRegexp.test(s);
  }
}
export { ZipCodeValidator };
export { ZipCodeValidator as mainValidator };
```

#### Re-exports

```typescript
export class ParseIntBasedZipCodeValidator {
  isAcceptable(s: string) {
    return s.length === 5 && parseInt(s).toString() === s;
  }
}

// Export original validator but rename it
export { ZipCodeValidator as RegExpBasedZipCodeValidator } from './ZipCodeValidator';
```

#### 合并导出

```typescript
export * from './StringValidator'; // exports 'StringValidator'
export * from './ZipCodeValidator'; // exports const 'numberRegexp' and 'ZipCodeValidator'
export * from './ParseIntBasedZipCodeValidator'; // exports the 'ParseIntBasedZipCodeValidator'
```

#### 默认导出

```typescript
// JQuery.d.ts
declare let $: JQuery;
export default $;

// Main.ts
import $ from 'jquery';
$('button.continue').html('Next Step...');
```

#### Export all as x

```typescript
export * as utilities from './utilities';

import { utilities } from './index';
```

### Import

```typescript
import { ZipCodeValidator } from './ZipCodeValidator';
let myValidator = new ZipCodeValidator();
```

#### 重命名导入

```typescript
import { ZipCodeValidator as ZCV } from './ZipCodeValidator';
```

#### 导入为一个变量

```typescript
import * as validator from './ZipCodeValidator';
let v = new validator.ZipCodeValidator();
```

#### 导入具有副作用的模块

尽管不建议这样做，但某些模块会设置一些可由其他模块使用的全局状态。

```typescript
// TODO ...
```

### export = and import = require()

```typescript
// TODO ...
```
