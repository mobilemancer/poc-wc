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
        const elementsAndPropsToWatch = this.replaceStringLiterals(elements);
        const propertiesToWatch = elementsAndPropsToWatch.propertiesToWatch;
        const templateString = this.convertNodesToString(elementsAndPropsToWatch.elements);
        return { templateString, propertiesToWatch };
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
    static replaceStringLiterals(elements) {
        // gather all property names used in string literals
        const propertiesToWatch = new Set();
        // walk over all leaf elements and check for string literals
        elements.filter(element => element.childElementCount === 0 && element.innerHTML.includes("${")).forEach(element => {
            let end = 0;
            while (element.innerHTML.indexOf("${", end) > -1) {
                let start = element.innerHTML.indexOf("${", end);
                end = element.innerHTML.indexOf("}", start);
                let stringLiteral = element.innerHTML.substring(start, end + 1);
                let stringLiteralName = element.innerHTML.substring(start + 2, end);
                if (!propertiesToWatch.has(stringLiteralName)) {
                    propertiesToWatch.add(stringLiteralName);
                }
                // replace string literal with a span that has a data-binding attr
                element.innerHTML = element.innerHTML.replace(stringLiteral, `<span data-bind='${stringLiteralName}'></span>`);
            }
        });
        return { elements, propertiesToWatch };
    }
    static serializeElements(elements) { }
}
TemplateParser.stringLiteralCounter = 0;

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
        const templateAndProps = this.parseTemplate(template);
        if (templateAndProps)
            this.setTemplate(templateAndProps.templateString);
        if (style)
            this.setStyle(style);
        this.addValuesToOnChangeWatchList(templateAndProps === null || templateAndProps === void 0 ? void 0 : templateAndProps.propertiesToWatch);
        // // look for string literal bindings and replace them
        // template = this.parseTemplate(template);
        // console.log("connectedCallback looks like the following - pre new:");
        // console.log(this.connectedCallback.toString());
        // this.connectedCallback = <any>Function(this.constructConnectedCallback());
        // console.log("connectedCallback looks like the following - post new:");
        // console.log(this.connectedCallback.toString());
        console.log(`Element base constructor executed - ${this === null || this === void 0 ? void 0 : this.tagName}`);
    }
    /* istanbul ignore next */
    attributeChangedCallback(name, oldValue, newValue) {
        console.log("element attributes changed.");
        console.log(name, oldValue, newValue);
    }
    /* istanbul ignore next */
    connectedCallback() {
        console.log(`connectedCallbackbase - ${this === null || this === void 0 ? void 0 : this.tagName}`);
    }
    /* istanbul ignore next */
    disconnectedCallback() {
        console.log(`disconnectedCallback base - ${this === null || this === void 0 ? void 0 : this.tagName}`);
    }
    /* istanbul ignore next */
    adoptedCallback() {
        console.log(`adoptedCallback base - ${this === null || this === void 0 ? void 0 : this.tagName}`);
    }
    addValuesToOnChangeWatchList(values) {
        if (!values) {
            return;
        }
        values.forEach((v) => ElementBase.observedAttributesArray.push(v));
        console.log("Added values to watchlist");
        console.log(new Array(...values).join(" "));
    }
    constructConnectedCallback() {
        let functionBody = `console.log("Connected callback - replaced");\r\n`;
        // TemplateParser.stringLiteralReplacements.forEach((val, key, map) => {
        //   // val.forEach((instance) => {
        //   //   functionBody += `document.querySelector("#${instance}").innerHtml = host.getAttribute('key');\r\n`;
        //   // });
        // });
        this.constructConnectedCallbackString = functionBody;
        return functionBody;
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
// static get observedAttributes() {
//   console.log("Returning observed attributes");
//   console.log(...ElementBase.observedAttributesArray);
//   return ElementBase.observedAttributesArray;
// }
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

var template = "<div class=\"internal-binding\">\r\n  <!-- <button onclick=\"clicked\">Change mode</button> -->\r\n  <button>Change mode</button>\r\n\r\n  <p>${mode}</p>\r\n</div>\r\n";

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
    static get observedAttributes() {
        console.log("getting observed attributes");
        console.log(ElementBase.observedAttributesArray);
        return ElementBase.observedAttributesArray;
    }
    constructor() {
        var _a;
        console.log("Constructor for InternalBinding started");
        super(template, css_248z);
        this.mode = "untouched 🆕";
        this.clicked = () => {
            if (this.mode.startsWith("dark")) {
                this.mode = "light ☀️";
            }
            else {
                this.mode = "dark 🌒";
            }
            this.setAttribute('mode', this.mode);
            console.log(this.mode);
        };
        console.table();
        const btn = (_a = this === null || this === void 0 ? void 0 : this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector("button");
        if (btn) {
            btn.onclick = this.clicked;
        }
        console.log("Constructor for InternalBinding finished");
    }
    attributeChangedCallback(name, oldValue, newValue) {
        console.log("attr changed");
        console.log(name);
    }
    connectedCallback() {
        console.log("callback from internal-binding");
    }
}
// define the element
window.customElements.define(getElementName(InternalBinding.name), InternalBinding);

export { AdvancedComponent, HeaderComponent, HeaderComponent2, InternalBinding };
