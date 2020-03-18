---
title: TypeScript 笔记三（类）
---

### Classes

```typescript
class O { readonly clazz: string = 'Object class'; }

class Point extends O {
  constructor(public x: number, public y: number) { super(); }
}

interface Renderable {
  render(): void;
}

interface Movable {
  move(): void;
}

abstract class Sprite extends O implements Renderable {

  private origin: Point;

  constructor(x: number, y: number) {
    super();
    this.origin = new Point(x, y);
  }

  render(): void {
    const offset = this.getOffset();
    console.log(
      `${this.clazz} ${this.constructor.name} Render -> x: ${this.origin.x +
        offset.x}, y: ${this.origin.y + offset.y}`
    );
  }

  protected abstract getOffset(): { x: number; y: number };
}

class Player extends Sprite implements Movable {

  private xOffset: number = 0;
  private yOffset: number = 0;

  protected getOffset(): { x: number; y: number } {
    return { x: this.xOffset, y: this.yOffset };
  }

  move(): void {
    this.xOffset += 100;
    this.yOffset += 100;
  }
}

class Monster extends Sprite implements Movable {

  private xOffset: number = 0;
  private yOffset: number = 0;

  protected getOffset(): { x: number; y: number } {
    return { x: this.xOffset, y: this.yOffset };
  }

  move(): void {
    this.xOffset -= 100;
    this.yOffset -= 100;
  }
}

let player: Player = new Player(0, 0);
let monster: Monster = new Monster(100, 100);
player.render();
monster.render();
player.move();
monster.move();
player.render();
monster.render();
```
