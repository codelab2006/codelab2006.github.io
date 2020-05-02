---
title: Web Components 实例教程
---

## 一. 概念

Web Components 是一套允许你创建可重用的自定义元素的技术，它由浏览器直接提供，不需要引入任何第三方框架。Web Components 由三部分组成：

- **自定义元素（Custom elements）** 一套 JavaScript API，用来定义自定义元素和行为。
- **影子 DOM（Shadow DOM）** 一套 JavaScript API，用来封装影子 DOM 树，并将其添加到元素上。
- **HTML 模板（HTML templates）** 使用 \<template\> 和 \<slot\> 元素编写不在呈现页面中显示的标记模板。然后它们可以作为自定义元素结构的基础被多次重用。

## 二. 举个例子

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />
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

从上面的例子可以看到，我们创建了一个自定义元素 popup-message，并在 html 文档中使用这个新的元素。你可以在[这里](/assets/examples/Web-Components/popup-message.html)查看实际的运行结果。

## 三. 自定义元素（Custom elements）

Web Components 的一个核心功能是创建自定义的元素。我们可以将功能封装到自定义元素中，并重用它们。在使用自定义元素之前我们需要定义和注册它。我们需要创建一个新的类来定义自定义元素，正如上面例子中的 PopupMessage 类。除此之外我们使用 [CustomElementRegistry.define()](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define) 方法注册我们的自定义元素。注册之后我们便可以在 html 文档中使用它。

我们也可以为自定义元素添加生命周期回调函数，这些回调函数将在元素生命周期的特定时刻被触发，请看下面的例子。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />
    <title>Hello, web components</title>
  </head>
  <body>
    <div id="operation">
      <button id="add">添加自定义元素</button>
      <button id="update">更新自定义元素</button>
      <button id="remove">移除自定义元素</button>
    </div>
    <div id="container"></div>
    <ul id="console"></ul>
    <script>
      customElements.define(
        "custom-element",
        class extends HTMLElement {
          static get observedAttributes() {
            return ["attribute-aaa", "attribute-bbb"];
          }

          constructor() {
            super();
            log("Create CustomElement");
            this.shadow = this.attachShadow({ mode: "open" });
            const div = document.createElement("div");
            div.setAttribute("class", "box");
            const style = document.createElement("style");
            style.textContent =
              ".box { height: 100px; background-color: red; border: 2px solid black; margin: 2px; }";
            this.shadow.appendChild(style);
            this.shadow.appendChild(div);
          }

          connectedCallback() {
            log(">>>>>>>>>> connectedCallback called");
          }

          disconnectedCallback() {
            log(">>>>>>>>>> disconnectedCallback called");
          }

          adoptedCallback() {
            log(">>>>>>>>>> adoptedCallback called");
          }

          attributeChangedCallback(name, oldValue, newValue) {
            log(
              `>>>>>>>>>> attributeChangedCallback called name: ${name}, oldValue: ${oldValue}, newValue: ${newValue}`
            );
          }
        }
      );
      const log = function (msg) {
        const li = document.createElement("li");
        li.textContent = msg;
        document.querySelector("#console").appendChild(li);
      };

      {
        const operationEl = document.querySelector("#operation");
        const addEl = operationEl.querySelector("#add");
        const updateEl = operationEl.querySelector("#update");
        updateEl.disabled = true;
        const removeEl = operationEl.querySelector("#remove");
        removeEl.disabled = true;

        let customElement = null;
        const containerEl = document.querySelector("#container");
        addEl.addEventListener("click", () => {
          customElement = document.createElement("custom-element");
          log("CustomElement created");
          log("Before customElement setAttribute attribute-aaa");
          customElement.setAttribute("attribute-aaa", "AAA");
          log("After customElement setAttribute attribute-aaa");
          log("Before customElement setAttribute attribute-bbb");
          customElement.setAttribute("attribute-bbb", "BBB");
          log("After customElement setAttribute attribute-bbb");
          containerEl.appendChild(customElement);
          addEl.disabled = true;
          updateEl.disabled = removeEl.disabled = false;
        });

        updateEl.addEventListener("click", () => {
          customElement.setAttribute("attribute-aaa", "AAAChange");
          customElement.setAttribute("attribute-bbb", "BBBChange");
        });
        removeEl.addEventListener("click", () => {
          containerEl.removeChild(customElement);
          addEl.disabled = false;
          updateEl.disabled = removeEl.disabled = true;
        });
      }
    </script>
  </body>
</html>
```

你可以在[这里](/assets/examples/Web-Components/custom-elements-lifecycle-callbacks.html)查看实际的运行结果。

## 四. 影子 DOM（Shadow DOM）

Web Components 的另一个重要的功能是封装，而影子 DOM 就是实现封装的基础。使用 Element.attachShadow 方法可以在当前元素上创建一个影子 DOM。影子 DOM 通过限制你对其子节点的访问来实现封装。请分析下面的例子：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />
    <title>Hello, web components</title>
  </head>
  <body>
    <span>请查看控制台...</span>
    <tree-node-no-shadow></tree-node-no-shadow>
    <tree-node-open></tree-node-open>
    <tree-node-closed></tree-node-closed>
    <script>
      window.customElements.define(
        "tree-node-no-shadow",
        class extends HTMLElement {
          constructor() {
            super();
            const div = document.createElement("div");
            div.id = "noShadowId";
            this.appendChild(div);
          }
        }
      );
      console.log(
        `document.querySelector("#noShadowId"): ${document.querySelector(
          "#noShadowId"
        )}`
      );
      window.customElements.define(
        "tree-node-open",
        class extends HTMLElement {
          constructor() {
            super();
            this.shadow = this.attachShadow({ mode: "open" });
            const div = document.createElement("div");
            div.id = "openId";
            this.shadow.appendChild(div);
          }
        }
      );
      console.log(
        `document.querySelector("#openId"): ${document.querySelector(
          "#openId"
        )}`
      );
      const treeNodeOpen = document.querySelector("tree-node-open").shadowRoot;
      console.log(
        `document.querySelector("tree-node-open").shadowRoot: ${treeNodeOpen}`
      );
      console.log(
        `treeNodeOpen.querySelector("#openId"): ${treeNodeOpen.querySelector(
          "#openId"
        )}`
      );
      window.customElements.define(
        "tree-node-closed",
        class extends HTMLElement {
          constructor() {
            super();
            this.shadow = this.attachShadow({ mode: "closed" });
            const div = document.createElement("div");
            div.id = "closedId";
            this.shadow.appendChild(div);
          }
        }
      );
      console.log(
        `document.querySelector("#closedId"): ${document.querySelector(
          "#closedId"
        )}`
      );
      console.log(
        `document.querySelector("tree-node-closed").shadowRoot: ${
          document.querySelector("tree-node-closed").shadowRoot
        }`
      );
    </script>
  </body>
</html>
```

我们创建了三个自定义元素：

- **tree-node-no-shadow** 未使用影子 DOM，其 noShadowId 子节点可以使用 document.querySelector("#noShadowId") 找到。
- **tree-node-open** 使用了 mode 为 open 的影子 DOM，其 openId 子节点不能使用 document.querySelector("#openId") 找到。但是我们可以先找到自定义元素 tree-node-open，再从其 shadowRoot 开始，使用 querySelector("#openId") 查找。
- **tree-node-closed** 使用了 mode 为 closed 的影子 DOM，其 closedId 子节点不能使用 document.querySelector("#closedId") 找到。甚至想引用其 shadowRoot 都是不可能的。

你可以在[这里](/assets/examples/Web-Components/shadow-dom.html)查看实际的运行结果。

## 五. HTML 模板（HTML templates）

### template

从上面的例子我们可以看到，我们常常使用 document.createElement("...") 方法创建元素，并设置其属性。实际上我们可以在 template 元素中定义它们。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />
    <title>Hello, web components</title>
  </head>
  <body>
    <template id="popup-message-tpl">
      <style>
        .container {
          box-sizing: border-box;
          display: flex;
          border: 1px solid black;
          width: 300px;
          height: 100px;
          padding: 10px;
          align-items: center;
        }
        .icon {
          width: 64px;
          height: 64px;
          background-color: lime;
        }
        .message {
          flex-grow: 1;
          text-align: center;
        }
      </style>
      <div class="container">
        <div class="icon"></div>
        <span class="message"></span>
      </div>
    </template>
    <popup-message
      data-message="Hello web components message 1"
    ></popup-message>
    <popup-message
      data-message="Hello web components message 2"
    ></popup-message>
    <script>
      window.customElements.define(
        "popup-message",
        class extends HTMLElement {
          constructor() {
            super();
            const template = document.getElementById("popup-message-tpl");
            const shadowRoot = this.attachShadow({ mode: "closed" });
            shadowRoot.appendChild(template.content.cloneNode(true));
            shadowRoot.querySelector(
              ".message"
            ).textContent = this.getAttribute("data-message");
          }
        }
      );
    </script>
  </body>
</html>
```

你可以在[这里](/assets/examples/Web-Components/html-templates-template.html)查看实际的运行结果。

### slot

上一个例子中，我们看到可以通过传入不同的 data-message 显示不同的信息。如果我们希望显示更复杂的内容，我们就需要使用 slot。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />
    <title>Hello, web components</title>
  </head>
  <body>
    <template id="popup-message-tpl">
      <style>
        .container {
          box-sizing: border-box;
          display: flex;
          border: 1px solid black;
          width: 300px;
          height: 100px;
          padding: 10px;
          align-items: center;
        }
        .icon {
          width: 64px;
          height: 64px;
          background-color: lime;
        }
        .message {
          flex-grow: 1;
          text-align: center;
        }
      </style>
      <div class="container">
        <div class="icon"></div>
        <div class="message">
          <slot name="message">default message</slot>
        </div>
      </div>
    </template>
    <popup-message></popup-message>
    <popup-message>
      <div slot="message">
        <ul>
          <li>Message 1</li>
          <li>Message 2</li>
        </ul>
      </div>
    </popup-message>
    <script>
      window.customElements.define(
        "popup-message",
        class extends HTMLElement {
          constructor() {
            super();
            const template = document.getElementById("popup-message-tpl");
            const shadowRoot = this.attachShadow({ mode: "closed" });
            shadowRoot.appendChild(template.content.cloneNode(true));
          }
        }
      );
    </script>
  </body>
</html>
```

你可以在[这里](/assets/examples/Web-Components/html-templates-slot.html)查看实际的运行结果。
