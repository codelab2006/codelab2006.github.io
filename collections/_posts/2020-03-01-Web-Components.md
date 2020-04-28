---
title: Web Components 实例教程
---

## 一. 概念

当我们在使用 Angular，React，Vue 等前端框架时，我们通常会创建可重用的组件，使用这些组件来组成我们的应用。而 Web Components 则是另一个类似的技术，浏览器直接提供与创建可重用组件相关的 API，我们使用这些 API 来创建可重用的原生组件。Web Components 由三部分组成：

- **自定义元素（Custom elements）**一套 JavaScript API 集合，用来定义自定义元素和行为。
- **影子 DOM（Shadow DOM）**一套 JavaScript API 集合，用来封装影子 DOM 树，并将其添加到元素上。
- **HTML 模板（HTML templates）**使用 \<template\> 和 \<slot\> 元素编写不在呈现页面中显示的标记模板。然后它们可以作为自定义元素结构的基础被多次重用。

## 二. 举个例子

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Hello, web components</title>
  </head>
  <body>
    <popup-message data-message="Hello web components"></popup-message>
    <script>
      class PopupMessage extends HTMLElement {
        constructor() {
          super();

          const shadow = this.attachShadow({ mode: "open" });
          const container = this.createContainer();
          const icon = this.createIcon();
          const message = this.createMessage();

          container.appendChild(icon);
          container.appendChild(message);

          const style = document.createElement("style");
          style.textContent =
            ".container { box-sizing: border-box; display: flex; border: 1px solid black; width: 300px; height: 100px; padding: 10px; align-items: center; }" +
            ".icon { width: 64px; height: 64px; background-color: lime; }" +
            ".message { flex-grow: 1; text-align: center; }";

          shadow.appendChild(style);
          shadow.appendChild(container);
        }

        createContainer() {
          const container = document.createElement("div");
          container.setAttribute("class", "container");
          return container;
        }

        createIcon() {
          const icon = document.createElement("div");
          icon.setAttribute("class", "icon");
          return icon;
        }

        createMessage() {
          const message = document.createElement("span");
          message.setAttribute("class", "message");
          message.textContent = this.getAttribute("data-message");
          return message;
        }
      }

      window.customElements.define("popup-message", PopupMessage);
    </script>
  </body>
</html>
```

从上面的例子可以看到，我们创建了一个自定义元素 popup-message，并在 html 中使用这个新的元素。你可以在[这里](/assets/examples/Web-Components/popup-message.html)查看实际的运行结果。

## 三. 自定义元素（Custom elements）

## 四. 影子 DOM（Shadow DOM）

## 五. HTML 模板（HTML templates）
