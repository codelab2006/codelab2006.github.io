---
title: TypeScript 笔记三（类）
---

### Classes

TypeScript 中的类和其他面向对象语言中的类有很多相似之处。下面的代码段描述了类的一些基本特性：

- 类的定义。
- 继承。
- Public，Protected，Private。
- Static 属性。
- Readonly 属性。
- 访问器。
- 抽象类。
- 接口的实现。

```typescript
class O {
  static readonly clazz: string = 'Object class';
}
// O.clazz = 'ABC'; // Error

class Point extends O {
  set x(v: number) {
    console.log(`set x: ${v}`);
    this._x = v > 1000 ? 1000 : v;
  }
  get x(): number {
    return this._x;
  }
  set y(v: number) {
    console.log(`set y: ${v}`);
    this._y = v > 1000 ? 1000 : v;
  }
  get y(): number {
    return this._y;
  }

  constructor(private _x: number, private _y: number) {
    super();
  }
}

interface Renderable {
  render(): void;
}

interface Movable {
  move(xOffset: number, yOffset: number): void;
}

abstract class Sprite extends O implements Renderable {
  private origin: Point;

  constructor(x: number, y: number) {
    super();
    this.origin = new Point(x, y);
  }

  render(): void {
    const offset = this.getOffset();
    this.origin.x += offset.x;
    this.origin.y += offset.y;
    console.log(
      `${O.clazz} ${this.constructor.name} Render -> x: ${this.origin.x}, y: ${this.origin.y}`
    );
  }

  protected abstract getOffset(): { x: number; y: number };
}

class Player extends Sprite implements Movable {
  private xOffset: number = 0;
  private yOffset: number = 0;

  protected getOffset(): { x: number; y: number } {
    const offset = { x: this.xOffset, y: this.yOffset };
    return offset;
  }

  move(xOffset: number, yOffset: number): void {
    this.xOffset = xOffset;
    this.yOffset = yOffset;
  }
}

class Monster extends Sprite implements Movable {
  private xOffset: number = 0;
  private yOffset: number = 0;

  protected getOffset(): { x: number; y: number } {
    const offset = { x: this.xOffset, y: this.yOffset };
    return offset;
  }

  move(xOffset: number, yOffset: number): void {
    this.xOffset = xOffset;
    this.yOffset = yOffset;
  }
}

let player: Player = new Player(0, 0);
let monster: Monster = new Monster(100, 100);
player.render();
monster.render();
player.move(100, 100);
monster.move(-100, -100);
player.render();
monster.render();
player.move(1000000, 1000000);
monster.move(1000000, 1000000);
player.render();
monster.render();
```
