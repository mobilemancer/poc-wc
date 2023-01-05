import TemplateParser from "./utils/TemplateParser";
import { getElementName } from "./utils/utils";

/**
 * Description placeholder
 * @date 2022-12-28 - 01:08:02
 *
 * @export
 * @class ReactiveBase
 * @typedef {ElementBase}
 * @extends {HTMLElement}
 */
export class ElementBase extends HTMLElement {

  /**
   * Description placeholder
   * @date 2022-12-28 - 01:08:02
   *
   * @private
   * @type {(ShadowRoot | undefined)}
   */
  public shadow: ShadowRoot | undefined;

  /**
   * Description placeholder
   * @date 2022-12-28 - 01:08:02
   *
   * @private
   * @type {*}
   */
  private state: any = {};
  private mutationObserver: MutationObserver;
  private watchedProperties = new Map<string, any>();

  /**
   * Creates an instance of ReactiveBase.
   * @date 2022-12-28 - 01:08:02
   *
   * @constructor
   */
  constructor(template?: string, style?: string) {
    super();

    this.shadow = this.attachShadow({ mode: "open" });

    const templateAndProps = this.parseTemplate(template);
    if (templateAndProps) this.setTemplate(templateAndProps.templateString);
    if (style) this.setStyle(style);
    // this.addValuesToOnChangeWatchList(templateAndProps?.propertiesToWatch);

    // create getters and setters for props to observe
    this.setupAcessorsForWatchedProps(templateAndProps?.propertiesToWatch);



    this.mutationObserver = new MutationObserver(this.mutationObserverCallback);
    this.mutationObserver.observe(this, { attributes: true, attributeOldValue: true });

    console.log(`Element base constructor executed - ${this?.tagName}`);
  }

  setupAcessorsForWatchedProps(propertiesToWatch: Set<string> | undefined) {
    console.log("setupAcessorsForWatchedProps")
    if (!propertiesToWatch) { return; }
    console.log(new Array(...propertiesToWatch));

    propertiesToWatch.forEach(propName => {
      console.log("getters and setters for $1", propName);
      Object.defineProperty(this, propName, {
        get: () => {
          console.log("getting $1", propName)
          console.log("result", this.watchedProperties.get("_" + propName))
          return this.watchedProperties.get("_" + propName);
        },
        set: (value: any) => {
          console.log("setting $1", propName, value)
          this.watchedProperties.set("_" + propName, value);
          console.log("result", this.watchedProperties.get("_" + propName))
          if (this.getAttribute(propName) !== value) {
            this.setAttribute(propName, value);
          }
        },
      });
    });
  }

  updateStringLiteralsInDOM(propName: string) {
    console.log("updateStringLiteralsInDOM for ", propName);
    const elements = this.querySelectorAll(`[data-bind='${propName}']`);
    elements.forEach(e => {
      console.log("updating innerhtml for element ", e);

      e.innerHTML = this.watchedProperties.get("_" + propName);
    });
  }

  /* istanbul ignore next */
  connectedCallback() {
    console.log(`connectedCallbackbase - ${this?.tagName}`);
  }

  /* istanbul ignore next */
  disconnectedCallback() {
    console.log(`disconnectedCallback base - ${this?.tagName}`);
    this.mutationObserver.disconnect();
  }

  /* istanbul ignore next */
  adoptedCallback() {
    console.log(`adoptedCallback base - ${this?.tagName}`);
  }

  private addValuesToOnChangeWatchList(values?: Set<string>) {
    if (!values) {
      return;
    }
    // values.forEach((v) => ElementBase.observedAttributesArray.push(v));
    //TODO: ?
    console.log("Added values to watchlist");
    console.log(new Array(...values).join(" "));
  }

  mutationObserverCallback(mutationList: any, observer: any) {
    for (const mutation of mutationList) {
      if (mutation.type === 'attributes'
        && mutation.oldValue !== mutation.target.getAttribute(mutation.attributeName)) {
        console.log(`The dynamic ${mutation.attributeName} attribute was modified.`);

      }
    }
  }
  constructConnectedCallback(): string {
    let functionBody = `console.log("Connected callback - replaced");\r\n`;
    // this.constructConnectedCallbackString = functionBody;
    return functionBody;
  }

  public constructConnectedCallbackString = "";

  private parseTemplate(template: string | undefined) {
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
  setState(newState: Object) {
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
  private isObject(value: any) {
    return true;
  }

  /**
   * Set the component template
   * @date 2022-12-28 - 01:08:02
   *
   * @public
   * @param {string} template
   */
  public setTemplate(template: string, instance?: any): void {
    (instance || this).shadow!.innerHTML = template;
  }

  /**
   * Set the style of the component
   * @date 2022-12-28 - 01:08:02
   *
   * @public
   * @param {string} style
   */
  public setStyle(style: string, instance?: any): void {
    if ((instance || this).shadow === undefined) {
      console.warn(
        `Failed to set styling on element ${(instance || this).tagName
        }, shadow root is undefined`
      );
      return;
    }

    const styleElement = document.createElement("style");
    styleElement.textContent = style;
    (instance || this).shadow.appendChild(styleElement);
  }
}
