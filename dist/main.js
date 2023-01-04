class HeaderComponent extends HTMLElement {
    get text() {
        return this.getAttribute("text") || "";
    }
    set text(value) {
        // this._text = value;
    }
    constructor() {
        // Always call super first in constructor
        super();
        this._text = "";
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
    get text() {
        return this._text || "Hoopa unbound";
    }
    set text(value) {
        this._text = value;
        this.header.innerText = this._text;
    }
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
        this._text = "Hoopa unbound";
        this._color = "blue";
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
            var _a;
            if (((_a = node.parentNode) === null || _a === void 0 ? void 0 : _a.nodeName) === 'BODY') {
                result += node.outerHTML || node.nodeValue;
            }
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
    static findStringLiterals(elements) {
        elements.filter(element => element.childElementCount === 0 && element.innerHTML.includes("${")).forEach(element => {
            let end = 0;
            while (element.innerHTML.indexOf("${", end) > -1) {
                let start = element.innerHTML.indexOf("${", end);
                end = element.innerHTML.indexOf("}", start);
                let stringLiteral = element.innerHTML.substring(start, end + 1);
                let stringLiteralName = element.innerHTML.substring(start + 2, end);
                if (!this.stringLiteralReplacements.has(stringLiteralName)) {
                    this.stringLiteralReplacements.add(stringLiteralName);
                }
                element.innerHTML = element.innerHTML.replace(stringLiteral, `<span data-bind='${stringLiteralName}'></span>`);
            }
        });
        return elements;
    }
    static serializeElements(elements) { }
}
TemplateParser.stringLiteralCounter = 0;
TemplateParser.stringLiteralReplacements = new Set();

/**
 * Description placeholder
 * @date 2022-12-28 - 01:08:02
 *
 * @export
 * @class ReactiveBase
 * @typedef {ElementBase}
 * @extends {HTMLElement}
 */
class ElementBase extends HTMLElement {
    static get observedAttributes() {
        return ElementBase.observedAttributesArray;
    }
    /**
     * Creates an instance of ReactiveBase.
     * @date 2022-12-28 - 01:08:02
     *
     * @constructor
     */
    constructor(template, style) {
        super();
        /**
         * Description placeholder
         * @date 2022-12-28 - 01:08:02
         *
         * @private
         * @type {*}
         */
        this.state = {};
        this.constructConnectedCallbackString = "";
        this.shadow = this.attachShadow({ mode: "open" });
        const parsedTemplate = this.parseTemplate(template);
        if (parsedTemplate)
            this.setTemplate(parsedTemplate);
        if (style)
            this.setStyle(style);
        this.addValuesToOnChangeWatchList();
        // // look for string literal bindings and replace them
        // template = this.parseTemplate(template);
        // console.log("connectedCallback looks like the following - pre new:");
        // console.log(this.connectedCallback.toString());
        // this.connectedCallback = <any>Function(this.constructConnectedCallback());
        // console.log("connectedCallback looks like the following - post new:");
        // console.log(this.connectedCallback.toString());
        console.log(`Element base constructor executed - ${this === null || this === void 0 ? void 0 : this.tagName}`);
    }
    attributeChangedCallback(name, oldValue, newValue) {
        console.log('element attributes changed.');
        console.log(name, oldValue, newValue);
    }
    addValuesToOnChangeWatchList(values) {
        values = TemplateParser.stringLiteralReplacements;
        values.forEach(v => ElementBase.observedAttributesArray.push(v));
        console.log("Added values to watchlist");
        console.log(values.values);
    }
    constructConnectedCallback() {
        let functionBody = `console.log("Connected callback - replaced");\r\n`;
        TemplateParser.stringLiteralReplacements.forEach((val, key, map) => {
            // val.forEach((instance) => {
            //   functionBody += `document.querySelector("#${instance}").innerHtml = host.getAttribute('key');\r\n`;
            // });
        });
        this.constructConnectedCallbackString = functionBody;
        return functionBody;
    }
    /* istanbul ignore next */
    connectedCallback() {
        console.log(`Connected callback original - ${this === null || this === void 0 ? void 0 : this.tagName}`);
    }
    parseTemplate(template) {
        if (template === undefined) {
            console.warn(`Component ${this} has no template.`);
            return template;
        }
        return TemplateParser.parse(template);
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
                    ? Object.assign(Object.assign({}, this.state[key]), value) : value;
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
    setTemplate(template, instance) {
        (instance || this).shadow.innerHTML = template;
    }
    /**
     * Set the style of the component
     * @date 2022-12-28 - 01:08:02
     *
     * @public
     * @param {string} style
     */
    setStyle(style, instance) {
        if ((instance || this).shadow === undefined) {
            console.warn(`Failed to set styling on element ${(instance || this).tagName}, shadow root is undefined`);
            return;
        }
        const styleElement = document.createElement("style");
        styleElement.textContent = style;
        (instance || this).shadow.appendChild(styleElement);
    }
}
ElementBase.observedAttributesArray = [];

var template$1 = "<h1>Hello!!!</h1>";

var css_248z$1 = "h1 {\r\n  color: hotpink;\r\n  font-style: italic;\r\n  font-weight: bolder;\r\n}\r\n";

class AdvancedComponent extends ElementBase {
    constructor() {
        super(template$1, css_248z$1);
    }
}
// Define the new element
customElements.define("advanced-component", AdvancedComponent);

var template = "<div class=\"internal-binding\">\r\n  <button onclick=\"clicked\">Change mode</button>\r\n\r\n  <p>${mode}</p>\r\n</div>\r\n";

var css_248z = ".internal-binding {\r\n    background-color: blueviolet;\r\n    color: aliceblue;\r\n    border: 2px solid white;\r\n    border-radius: 0.5em;\r\n    padding: 8px;\r\n}";

/**
 * Returns the name of the element
 *
 * @param className name of the custom element class
 * @returns an hyphenated element name
 */
function getElementName(className) {
    const wordRegex = /[A-Z]?[a-z]+|[0-9]+|[A-Z]+(?![a-z])/g;
    const resultingWords = className.match(wordRegex);
    return !!resultingWords ? resultingWords.join("-").toLowerCase() : "";
}

// @CustomElement(template, style)
class InternalBinding extends ElementBase {
    constructor() {
        console.log("Constructor for InternalBinding started");
        super(template, css_248z);
        this.mode = "untouched 🆕";
        console.log("Constructor for InternalBinding finished");
    }
    clicked() {
        if (this.mode.startsWith("dark")) {
            this.mode = "light ☀️";
        }
        else {
            this.mode = "dark 🌒";
        }
    }
}
// define the element
window.customElements.define(getElementName(InternalBinding.name), InternalBinding);

export { AdvancedComponent, HeaderComponent, HeaderComponent2, InternalBinding };
