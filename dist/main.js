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

class TemplateParser {
    static parse(template) {
        const elements = this.getElements(template);
        const modifiedElements = this.findStringLiterals(elements);
        const templateString = this.convertNodesToString(modifiedElements);
        return templateString;
    }
    static convertNodesToString(nodes) {
        let result = "";
        nodes.forEach((node) => {
            result += node.outerHTML || node.nodeValue;
        });
        return result;
    }
    /**
     *
     * @param template find all HTMLElements in the component template
     * @returns an array of all HTMLElements
     */
    static getElements(template) {
        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(template, "text/html");
        const allElements = htmlDoc.getElementsByTagName("*");
        const elementsArray = [...allElements];
        // the DOMParser adds a few elements we're not inteerested in, remove them and return the rest
        return elementsArray.filter((e) => e.tagName !== "HTML" && e.tagName !== "HEAD" && e.tagName !== "BODY");
    }
    static stringLiteralCounter = 0;
    static stringLiteralReplacements = new Map();
    static findStringLiterals(elements) {
        elements.forEach((element) => {
            if (element.innerHTML.includes("${")) {
                let index = 0;
                while (element.innerHTML.indexOf("${", index) > -1) {
                    let start = element.innerHTML.indexOf("${", index);
                    let end = element.innerHTML.indexOf("}", start);
                    let stringLiteral = element.innerHTML.substring(start, end + 1);
                    let stringLiteralName = element.innerHTML.substring(start + 2, end);
                    element.innerHTML = element.innerHTML.replace(stringLiteral, `<span id='${stringLiteralName + this.stringLiteralCounter++}'></span>`);
                    if (!this.stringLiteralReplacements.has(stringLiteralName)) {
                        this.stringLiteralReplacements.set(stringLiteralName, []);
                    }
                    this.stringLiteralReplacements
                        .get(stringLiteralName)
                        ?.push(stringLiteralName + this.stringLiteralCounter);
                    index = end + 1;
                }
            }
        });
        return elements;
    }
    static serializeElements(elements) { }
}

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
        // look for string literal bindings and replace them
        template = this.parseTemplate(template);
        // set template if available
        if (!template || template.length === 0) {
            console.warn("No template to set for element");
            return;
        }
        this.setTemplate(template);
        // set style if available
        if (!!style && style.length > 0) {
            this.setStyle(style);
        }
        this.connectedCallback = this.constructConnectedCallback();
        console.log("Reactive base constructor finished.");
    }
    constructConnectedCallback() {
        return function () { };
    }
    parseTemplate(template) {
        if (template === undefined) {
            console.warn(`Component ${this} has no template.`);
            return template;
        }
        return TemplateParser.parse(template);
    }
    connectedCallback = function () {
        console.log("Connected callback");
    };
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
            console.warn(`Failed to set styling on element ${this.tagName}, shadow root is undefined`);
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

var template = "<button onclick=\"clicked\">Change mode</button>\r\n\r\n<p>${mode}</p>";

var css_248z = "";

const CustomElement = () => (customElement) => {
    // save a reference to the original constructor
    var original = customElement;
    // the new constructor behaviour
    var f = function (...args) {
        console.log("ClassWrapper: before class constructor", original.name);
        let instance = original.apply(this, args);
        console.log("ClassWrapper: after class constructor", original.name);
        return instance;
    };
    // copy prototype so intanceof operator still works
    f.prototype = original.prototype;
    /**
     * Runs each time the element is appended to or moved in the DOM
     */
    // customElement.prototype.connectedCallback || function () {};
    customElement.prototype.connectedCallback = function () {
        if (!this) {
            console.warn("Element is undefined?");
            return;
        }
        // Attach a click event listener to the button
        let btn = this.querySelector("button");
        if (!btn)
            return;
        btn.addEventListener("click", function (event) {
            console.log("clicked");
        });
    };
    // define the custom element
    window.customElements.define(ReactiveBase.getElementName(customElement.name), customElement);
    // return new constructor (will override original)
    return f;
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
};
InternalBinding = __decorate([
    CustomElement()
], InternalBinding);
var InternalBinding$1 = InternalBinding;

export { AdvancedComponent, HeaderComponent, HeaderComponent2, InternalBinding$1 as InternalBinding };
