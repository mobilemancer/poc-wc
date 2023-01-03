import TemplateParser from "./utils/TemplateParser";

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

  /**
   * Creates an instance of ReactiveBase.
   * @date 2022-12-28 - 01:08:02
   *
   * @constructor
   */
  constructor(template?: string, style?: string) {
    super();

    // // look for string literal bindings and replace them
    // template = this.parseTemplate(template);

    // // set template if available
    // if (!template || template.length === 0) {
    //   console.warn("No template to set for element");
    //   return;
    // }
    // this.setTemplate(template);

    // // set style if available
    // if (!!style && style.length > 0) {
    //   this.setStyle(style);
    // }


    // console.log("connectedCallback looks like the following - pre new:");
    // console.log(this.connectedCallback.toString());
    // this.connectedCallback = <any>Function(this.constructConnectedCallback());
    // console.log("connectedCallback looks like the following - post new:");
    // console.log(this.connectedCallback.toString());

    console.log(`Element base constructor executed - ${this?.tagName}`);
  }

  constructConnectedCallback(): string {
    let functionBody = `console.log("Connected callback - replaced");\r\n`;
    TemplateParser.stringLiteralReplacements.forEach((val, key, map) => {
      val.forEach((instance) => {
        functionBody += `document.querySelector("#${instance}").innerHtml = host.getAttribute('key');\r\n`;
      });
    });

    this.constructConnectedCallbackString = functionBody;
    return functionBody;
  }

  public constructConnectedCallbackString = "";


  /* istanbul ignore next */
  connectedCallback() {
    console.log(`Connected callback original - ${this?.tagName}`);
  }


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
  public setTemplate(template: string): void {
    if (!this.shadow) this.shadow = this.attachShadow({ mode: "open" });
    this.shadow.innerHTML = template;
  }

  /**
   * Set the style of the component
   * @date 2022-12-28 - 01:08:02
   *
   * @public
   * @param {string} style
   */
  public setStyle(style: string): void {
    if (this.shadow === undefined) {
      console.warn(
        `Failed to set styling on element ${this.tagName}, shadow root is undefined`
      );
      return;
    }

    const styleElement = document.createElement("style");
    styleElement.textContent = style;
    this.shadow.appendChild(styleElement);
  }
}
