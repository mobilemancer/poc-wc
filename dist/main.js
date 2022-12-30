class HeaderComponent extends HTMLElement {
    _text = "";
    get text() {
        return this.getAttribute("text") || "";
    }
    set text(value) {
        // this._text = value;
    }
    constructor() {
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

/**
 * Description placeholder
 * @date 2022-12-28 - 01:08:02
 *
 * @export
 * @class ReactiveBase
 * @typedef {ReactiveBase}
 * @extends {HTMLElement}
 */
class ReactiveBase extends HTMLElement {
    /**
     * Description placeholder
     * @date 2022-12-28 - 01:08:02
     *
     * @private
     * @type {(ShadowRoot | undefined)}
     */
    shadow;
    /**
     * Description placeholder
     * @date 2022-12-28 - 01:08:02
     *
     * @private
     * @type {*}
     */
    state = {};
    /**
     * Creates an instance of ReactiveBase.
     * @date 2022-12-28 - 01:08:02
     *
     * @constructor
     */
    constructor(template, style) {
        super();
        if (!!template && template.length > 0) {
            this.setTemplate(template);
            if (!!style && style.length > 0) {
                this.setStyle(style);
            }
        }
        console.log("Reactive base constructor finished.");
    }
    /**
     * Update the component state
     * @date 2022-12-28 - 01:08:02
     *
     * @param {Object} newState
     */
    setState(newState) {
        Object.entries(newState).forEach(([key, value]) => {
            this.state[key] =
                this.isObject(this.state[key]) && this.isObject(value)
                    ? { ...this.state[key], ...value }
                    : value;
        });
    }
    /**
     * Description placeholder
     * @date 2022-12-28 - 01:08:02
     *
     * @param {*} value
     * @returns {boolean}
     */
    isObject(value) {
        return true;
    }
    /**
     * Set the component template
     * @date 2022-12-28 - 01:08:02
     *
     * @public
     * @param {string} template
     */
    setTemplate(template) {
        this.shadow = this.attachShadow({ mode: "open" });
        this.shadow.innerHTML = template;
    }
    /**
     * Set the style of the component
     * @date 2022-12-28 - 01:08:02
     *
     * @public
     * @param {string} style
     */
    setStyle(style) {
        if (this.shadow === undefined) {
            console.warn(`Failed to set styling on element ${this.tagName}, shadoe root is undefined`);
            return;
        }
        const styleElement = document.createElement("style");
        styleElement.textContent = style;
        this.shadow.appendChild(styleElement);
    }
    /**
     * Returns the name of the element
     *
     * @param className name of the cextending class
     * @returns an hyphenated element name
     */
    static getElementName(className) {
        const wordRegex = /[A-Z]?[a-z]+|[0-9]+|[A-Z]+(?![a-z])/g;
        const resultingWords = className.match(wordRegex);
        return !!resultingWords ? resultingWords.join("-").toLowerCase() : "";
    }
}

var template$1 = "<h1>Hello!!!</h1>";

var css_248z$1 = "h1 {\r\n  color: hotpink;\r\n  font-style: italic;\r\n  font-weight: bolder;\r\n}\r\n";

class AdvancedComponent extends ReactiveBase {
    constructor() {
        super(template$1, css_248z$1);
    }
}
// Define the new element
customElements.define("advanced-component", AdvancedComponent);

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

var template = "<button onclick=\"clicked()\">Change mode</button>\r\n\r\n<p>${mode}</p>";

var css_248z = "";

const CustomElement = () => (cls) => {
    /**
     * Runs each time the element is appended to or moved in the DOM
     */
    cls.prototype.connectedCallback = () => {
        if (!cls) {
            console.warn("Element is undefined?");
            return;
        }
        // Attach a click event listener to the button
        let btn = cls.querySelector("button");
        if (!btn)
            return;
        btn.addEventListener("click", function (event) {
            console.log("clicked");
        });
    };
    window.customElements.define(ReactiveBase.getElementName(cls.name), cls);
};

let InternalBinding = class InternalBinding extends ReactiveBase {
    mode = "untouched 🆕";
    constructor() {
        super(template, css_248z);
    }
    clicked() {
        if (this.mode.startsWith("dark")) {
            this.mode = "light ☀️";
        }
        else {
            this.mode = "dark 🌒";
        }
    }
    connectedCallback() {
        console.log("connected callback");
    }
};
InternalBinding = __decorate([
    CustomElement()
], InternalBinding);
var InternalBinding$1 = InternalBinding;

export { AdvancedComponent, HeaderComponent, HeaderComponent2, InternalBinding$1 as InternalBinding };
