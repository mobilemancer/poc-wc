import TemplateParser from "./TemplateParser";

/**
 * Description placeholder
 * @date 2022-12-28 - 01:08:02
 *
 * @export
 * @class ReactiveBase
 * @typedef {ReactiveBase}
 * @extends {HTMLElement}
 */
export class ReactiveBase extends HTMLElement {
  /**
   * Description placeholder
   * @date 2022-12-28 - 01:08:02
   *
   * @private
   * @type {(ShadowRoot | undefined)}
   */
  private shadow: ShadowRoot | undefined;

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


    console.log("connectedCallback looks like the following - pre new:");
    console.log(this.connectedCallback.toString());
    this.connectedCallback = this.constructConnectedCallback();
    console.log("connectedCallback looks like the following - post new:");
    console.log(this.connectedCallback.toString());

    console.log("Reactive base constructor finished.");
  }

  constructConnectedCallback(): () => void {
    let functionBody = `console.log("Connected callback - replaced");\r\n`;
    TemplateParser.stringLiteralReplacements.forEach((val, key, map) => {
      val.forEach((instance) => {
        functionBody += `document.querySelector("#${instance}").innerHtml = host.getAttribute('key');\r\n`;
      });
    });

    const connectedCallback = new Function(functionBody);


    // TODO: fix typing
    return <any>connectedCallback;
  }

  /* istanbul ignore next */
  connectedCallback() {
    console.log("Connected callback original");
  };


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
  private setTemplate(template: string): void {
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
  private setStyle(style: string): void {
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

  /**
   * Returns the name of the element
   *
   * @param className name of the cextending class
   * @returns an hyphenated element name
   */
  public static getElementName(className: string): string {
    const wordRegex = /[A-Z]?[a-z]+|[0-9]+|[A-Z]+(?![a-z])/g;
    const resultingWords = className.match(wordRegex);
    return !!resultingWords ? resultingWords.join("-").toLowerCase() : "";
  }
}
