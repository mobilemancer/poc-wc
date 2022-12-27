'use strict';

class HeaderComponent extends HTMLElement {
    _text = "";
    get text() {
        return this.getAttribute("text") || "";
    }
    set text(value) {
        // this._text = value;
    }
    constructor() {
        console.log("Constructor for header-component started");
        // Always call super first in constructor
        super();
        // Create a shadow root
        const shadow = this.attachShadow({ mode: "open" });
        // Create header
        const header = document.createElement("h1");
        // Take attribute content and put it inside the info span
        // const text = this.getAttribute('data-text');
        header.textContent = this.text;
        // Create some CSS to apply to the shadow dom
        console.log("setting up style");
        const style = document.createElement("style");
        style.textContent = `
         h1 {
            color: green;
         }
        `;
        shadow.appendChild(style);
        // Attach the created elements to the shadow dom
        shadow.appendChild(header);
    }
}
// Define the new element
customElements.define("header-component", HeaderComponent);

class HeaderComponent2 extends HTMLElement {
    header;
    _text = "Hoopa unbound";
    get text() {
        return this._text || "Hoopa unbound";
    }
    set text(value) {
        this._text = value;
        this.header.innerText = this._text;
    }
    _color = "blue";
    get color() {
        return this._color || "red";
    }
    set color(val) {
        this._color = val;
        this.header.style.color = this._color;
    }
    constructor() {
        console.log("Constructor for header-component2 started");
        // Always call super first in constructor
        super();
        // Create a shadow root
        const shadow = this.attachShadow({ mode: "open" });
        // Create header
        this.header = document.createElement("h1");
        // Take attribute content and put it inside the info span
        // const text = this.getAttribute('data-text');
        this.header.textContent = this.text;
        // Create some CSS to apply to the shadow dom
        const style = document.createElement("style");
        style.textContent = `
         h1 {
            color: ${this.color};
         }
        `;
        shadow.appendChild(style);
        // Attach the created elements to the shadow dom
        shadow.appendChild(this.header);
    }
}
// Define the new element
customElements.define("header-component2", HeaderComponent2);

class ReactiveBase extends HTMLElement {
    state;
    constructor() {
        super();
        this.state = {};
    }
    setState(newState) {
        Object.entries(newState).forEach(([key, value]) => {
            this.state[key] =
                this.isObject(this.state[key]) && this.isObject(value)
                    ? { ...this.state[key], ...value }
                    : value;
        });
    }
    isObject(value) {
        return true;
    }
}

var template = "<template>\r\n\r\n    <h1>Hello!!!</h1>\r\n\r\n</template>";

class AdvancedComponent extends ReactiveBase {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        // shadowRoot.innerHTML = `
        //       <p data-bind="title"></p>
        //     `;
        console.log("html?");
        console.table(template);
        // fetch("../dist/advanced-component.html")
        //   .then((stream) => stream.text())
        //   .then((text) => console.log(text));
    }
}
// Define the new element
customElements.define("advanced-component", AdvancedComponent);

exports.AdvancedComponent = AdvancedComponent;
exports.HeaderComponent = HeaderComponent;
exports.HeaderComponent2 = HeaderComponent2;
