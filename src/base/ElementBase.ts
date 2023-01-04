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
  // static get observedAttributes() {
  //   console.log("Returning observed attributes");
  //   console.log(...ElementBase.observedAttributesArray);
  //   return ElementBase.observedAttributesArray;
  // }

  static observedAttributesArray: string[] = [];

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
    this.addValuesToOnChangeWatchList(templateAndProps?.propertiesToWatch);

    // // look for string literal bindings and replace them
    // template = this.parseTemplate(template);

    // console.log("connectedCallback looks like the following - pre new:");
    // console.log(this.connectedCallback.toString());
    // this.connectedCallback = <any>Function(this.constructConnectedCallback());
    // console.log("connectedCallback looks like the following - post new:");
    // console.log(this.connectedCallback.toString());

    console.log(`Element base constructor executed - ${this?.tagName}`);
  }

  /* istanbul ignore next */
  attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    console.log("element attributes changed.");
    console.log(name, oldValue, newValue);
  }
  /* istanbul ignore next */
  connectedCallback() {
    console.log(`connectedCallbackbase - ${this?.tagName}`);
  }

  /* istanbul ignore next */
  disconnectedCallback() {
    console.log(`disconnectedCallback base - ${this?.tagName}`);
  }

  /* istanbul ignore next */
  adoptedCallback() {
    console.log(`adoptedCallback base - ${this?.tagName}`);
  }

  private addValuesToOnChangeWatchList(values?: Set<string>) {
    if (!values) {
      return;
    }
    values.forEach((v) => ElementBase.observedAttributesArray.push(v));
    console.log("Added values to watchlist");
    console.log(new Array(...values).join(" "));
  }

  constructConnectedCallback(): string {
    let functionBody = `console.log("Connected callback - replaced");\r\n`;
    // TemplateParser.stringLiteralReplacements.forEach((val, key, map) => {
    //   // val.forEach((instance) => {
    //   //   functionBody += `document.querySelector("#${instance}").innerHtml = host.getAttribute('key');\r\n`;
    //   // });
    // });

    this.constructConnectedCallbackString = functionBody;
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
        `Failed to set styling on element ${
          (instance || this).tagName
        }, shadow root is undefined`
      );
      return;
    }

    const styleElement = document.createElement("style");
    styleElement.textContent = style;
    (instance || this).shadow.appendChild(styleElement);
  }
}
