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
    static connectEventHandlers(webComponent) {
        var _a;
        const elements = (_a = webComponent.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelectorAll("[data-onclick]");
        elements === null || elements === void 0 ? void 0 : elements.forEach(element => {
            const methodName = element.getAttribute("data-onclick");
            if (methodName && webComponent[methodName]) {
                element.addEventListener("click", (event) => webComponent[methodName](event));
            }
            else {
                console.warn("No click handler found for element:", element);
                element.addEventListener("click", (event) => console.warn("No click handler found for this element 😔"));
            }
        });
    }
    static parse(template) {
        const elementsAndPropsToWatch = {
            elements: new Array(),
            propertiesToWatch: new Set()
        };
        // const elements = this.getElements(template);
        this.getElements(template, elementsAndPropsToWatch);
        // const elementsAndPropsToWatch = this.replaceStringLiterals(elements);
        this.replaceStringLiterals(elementsAndPropsToWatch);
        elementsAndPropsToWatch.elements = this.replaceEventHandlers(elementsAndPropsToWatch.elements);
        const propertiesToWatch = elementsAndPropsToWatch.propertiesToWatch;
        const templateString = this.convertNodesToString(elementsAndPropsToWatch.elements);
        return { templateString, propertiesToWatch };
    }
    static replaceEventHandlers(elements) {
        elements.forEach(e => {
            const methodName = e.getAttribute("onclick");
            if (methodName) {
                e.removeAttribute("onclick");
                e.setAttribute("data-onclick", methodName);
            }
        });
        return elements;
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
    static getElements(template, elementsAndPropsToWatch) {
        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(template, "text/html");
        const allElements = htmlDoc.getElementsByTagName("*");
        const elementsArray = [...allElements];
        // the DOMParser adds a few elements we're not inteerested in, remove them and return the rest
        elementsAndPropsToWatch.elements = elementsArray.filter((e) => e.tagName !== "HTML" && e.tagName !== "HEAD" && e.tagName !== "BODY");
    }
    static replaceStringLiterals(elementsAndPropsToWatch) {
        // gather all property names used in string literals
        // const propertiesToWatch: Set<string> = new Set();
        // walk over all leaf elements and check for string literals
        elementsAndPropsToWatch.elements.filter(element => element.childElementCount === 0 && element.innerHTML.includes("${"))
            .forEach(element => {
            let end = 0;
            while (element.innerHTML.indexOf("${", end) > -1) {
                let start = element.innerHTML.indexOf("${", end);
                end = element.innerHTML.indexOf("}", start);
                let stringLiteral = element.innerHTML.substring(start, end + 1);
                let stringLiteralName = element.innerHTML.substring(start + 2, end);
                if (!elementsAndPropsToWatch.propertiesToWatch.has(stringLiteralName)) {
                    elementsAndPropsToWatch.propertiesToWatch.add(stringLiteralName);
                }
                // replace string literal with a span that has a data-binding attr
                element.innerHTML = element.innerHTML.replace(stringLiteral, `<span data-bind='${stringLiteralName}'></span>`);
            }
        });
    }
    static replaceRepeaters(elementsAndPropsToWatch) {
        // walk over all leaf elements and check for repeaters
        elementsAndPropsToWatch.elements.filter(element => {
            element.childElementCount === 0 && element.getAttribute("repeat.for");
        }).forEach(element => {
            console.log(element);
            let end = 0;
            while (element.innerHTML.indexOf("${", end) > -1) {
                let start = element.innerHTML.indexOf("${", end);
                end = element.innerHTML.indexOf("}", start);
                let stringLiteral = element.innerHTML.substring(start, end + 1);
                let stringLiteralName = element.innerHTML.substring(start + 2, end);
                if (!elementsAndPropsToWatch.propertiesToWatch.has(stringLiteralName)) {
                    elementsAndPropsToWatch.propertiesToWatch.add(stringLiteralName);
                }
                // replace string literal with a span that has a data-binding attr
                element.innerHTML = element.innerHTML.replace(stringLiteral, `<span data-bind='${stringLiteralName}'></span>`);
            }
        });
    }
    static serializeElements(elements) { }
}

/**
 * ElementBase
 * Base functionality for web components
 *
 * @date 2022-12-28 - 01:08:02
 *
 * @export
 * @class ReactiveBase
 * @typedef {ElementBase}
 * @extends {HTMLElement}
 */
class ElementBase extends HTMLElement {
    /**
     * Creates an instance of ElementBase.
     * @date 2022-12-28 - 01:08:02
     *
     * @constructor
     */
    constructor(template, style) {
        super();
        this.watchedProperties = new Map();
        this.shadow = this.attachShadow({ mode: "open" });
        // set the template and style
        const templateAndProps = this.parseTemplate(template);
        if (templateAndProps)
            this.setTemplate(templateAndProps.templateString);
        if (style)
            this.setStyle(style);
        // create getters and setters for props to observe
        this.setupAcessorsForWatchedProps(templateAndProps === null || templateAndProps === void 0 ? void 0 : templateAndProps.propertiesToWatch);
        // setup mutation observer
        this.mutationObserver = new MutationObserver(this.mutationObserverCallback);
        this.mutationObserver.observe(this, { attributes: true, attributeOldValue: true });
        console.log(`Element base constructor executed - ${this === null || this === void 0 ? void 0 : this.tagName}`);
    }
    /* istanbul ignore next */
    connectedCallback() {
        console.log(`connectedCallbackbase - ${this === null || this === void 0 ? void 0 : this.tagName}`);
    }
    /* istanbul ignore next */
    disconnectedCallback() {
        console.log(`disconnectedCallback base - ${this === null || this === void 0 ? void 0 : this.tagName}`);
        this.mutationObserver.disconnect();
    }
    /* istanbul ignore next */
    adoptedCallback() {
        console.log(`adoptedCallback base - ${this === null || this === void 0 ? void 0 : this.tagName}`);
    }
    /**
     *  handles mutation observer callbacks
     * @param mutationList
     * @param observer
     */
    mutationObserverCallback(mutationList, observer) {
        for (const mutation of mutationList) {
            if (mutation.type === 'attributes'
                && mutation.oldValue !== mutation.target.getAttribute(mutation.attributeName)) {
                console.log(`The dynamic ${mutation.attributeName} attribute was modified.`);
            }
        }
    }
    parseTemplate(template) {
        if (template === undefined) {
            console.warn(`Component ${this} has no template.`);
            return template;
        }
        return TemplateParser.parse(template);
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
    /**
     * setupAcessorsForWatchedProps
     * Setup getters and setters for props to be watched
     *
     * @param propertiesToWatch
     * @returns
     */
    setupAcessorsForWatchedProps(propertiesToWatch) {
        console.log("setupAcessorsForWatchedProps for the following props:", new Array(...propertiesToWatch));
        if (!propertiesToWatch) {
            return;
        }
        propertiesToWatch.forEach(propName => {
            console.log("defining getters and setters for", propName);
            this.createAccessorsForProperty(propName);
        });
    }
    createAccessorsForProperty(propName) {
        Object.defineProperty(this, propName, {
            get: () => {
                console.log("get:", propName, "value:", this.watchedProperties.get("_" + propName));
                return this.watchedProperties.get("_" + propName);
            },
            set: (value) => {
                console.log("setting", propName, "to:", value);
                if (this.watchedProperties.get("_" + propName) === value) {
                    console.log(propName, "already has value", value);
                    return;
                }
                this.watchedProperties.set("_" + propName, value);
                this.updateStringLiteralsInDOM(propName, value);
                if (this.getAttribute(propName) !== value) {
                    // keep attribute on element in sync with prop
                    this.setAttribute(propName, value);
                }
            },
        });
    }
    /**
     * updateStringLiteralsInDOM
     * Set all elements with 'data-bind="propName"' innerHTML to new value
     * @param propName
     */
    updateStringLiteralsInDOM(propName, value) {
        var _a;
        console.log("updateStringLiteralsInDOM for", propName);
        const elements = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelectorAll(`[data-bind='${propName}']`);
        elements === null || elements === void 0 ? void 0 : elements.forEach(e => {
            console.log("updating innerhtml for element", e);
            e.innerHTML = value;
        });
    }
}

var template$2 = "<h1>Hello!!!</h1>";

var css_248z$2 = "h1 {\r\n  color: hotpink;\r\n  font-style: italic;\r\n  font-weight: bolder;\r\n}\r\n";

class AdvancedComponent extends ElementBase {
    constructor() {
        super(template$2, css_248z$2);
    }
}
// Define the new element
customElements.define("advanced-component", AdvancedComponent);

var template$1 = "<div class=\"internal-binding\">\r\n  <button onclick=\"clicked\">Change mode</button>\r\n  <!-- <button>Change mode</button> -->\r\n  <button onclick=\"debug\">Debug</button>\r\n\r\n  <p>${mode}</p>\r\n</div>";

var css_248z$1 = ".internal-binding {\r\n    background-color: blueviolet;\r\n    color: aliceblue;\r\n    border: 2px solid white;\r\n    border-radius: 0.5em;\r\n    padding: 8px;\r\n}";

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
/**
 *
 * @param component Register a custom element
 */
function registerElement(component) {
    window.customElements.define(getElementName(component.name), component);
}

class InternalBinding extends ElementBase {
    constructor() {
        super(template$1, css_248z$1);
        this.mode = "untouched 🆕";
        this.clicked = () => {
            if (this.mode.startsWith("dark")) {
                this.mode = "light ☀️";
            }
            else {
                this.mode = "dark 🌒";
            }
        };
        // const btn = this?.shadowRoot?.querySelector("button");
        // if (btn) {
        //   btn.onclick = this.clicked;
        // }
        TemplateParser.connectEventHandlers(this);
    }
}
// define the element
window.customElements.define(getElementName(InternalBinding.name), InternalBinding);

var template = "<button id=\"dec\" onclick=\"dec\">-</button>\r\n<span id=\"count\">${count}</span>\r\n<button id=\"inc\" onclick=\"inc\">+</button>`\r\n";

var css_248z = "* {\r\n    font-size: 200%;\r\n}\r\n\r\nspan {\r\n    width: 4rem;\r\n    display: inline-block;\r\n    text-align: center;\r\n}\r\n\r\nbutton {\r\n    width: 4rem;\r\n    height: 4rem;\r\n    border: none;\r\n    border-radius: 10px;\r\n    background-color: seagreen;\r\n    color: white;\r\n}";

class CounterComponent extends ElementBase {
    constructor() {
        // 1. Init element with template and style
        super(template, css_248z);
        this.count = 0;
        // 2 . Connect event handlers
        TemplateParser.connectEventHandlers(this);
    }
    inc() {
        this.count++;
    }
    dec() {
        this.count--;
    }
}
// 3. Register the element
registerElement(CounterComponent);

export { AdvancedComponent, CounterComponent, HeaderComponent, HeaderComponent2, InternalBinding };
