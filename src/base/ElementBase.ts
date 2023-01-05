import TemplateParser from "./utils/TemplateParser";
import { getElementName } from "./utils/utils";

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
export class ElementBase extends HTMLElement {

  private mutationObserver: MutationObserver;
  private watchedProperties = new Map<string, any>();

  public shadow: ShadowRoot | undefined;

  /**
   * Creates an instance of ElementBase.
   * @date 2022-12-28 - 01:08:02
   *
   * @constructor
   */
  constructor(template?: string, style?: string) {
    super();

    this.shadow = this.attachShadow({ mode: "open" });

    // set the template and style
    const templateAndProps = this.parseTemplate(template);
    if (templateAndProps) this.setTemplate(templateAndProps.templateString);
    if (style) this.setStyle(style);

    // create getters and setters for props to observe
    this.setupAcessorsForWatchedProps(templateAndProps?.propertiesToWatch);

    // setup mutation observer
    this.mutationObserver = new MutationObserver(this.mutationObserverCallback);
    this.mutationObserver.observe(this, { attributes: true, attributeOldValue: true });

    console.log(`Element base constructor executed - ${this?.tagName}`);
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

  /**
   *  handles mutation observer callbacks
   * @param mutationList 
   * @param observer 
   */
  mutationObserverCallback(mutationList: any, observer: any) {
    for (const mutation of mutationList) {
      if (mutation.type === 'attributes'
        && mutation.oldValue !== mutation.target.getAttribute(mutation.attributeName)) {
        console.log(`The dynamic ${mutation.attributeName} attribute was modified.`);
      }
    }
  }

  private parseTemplate(template: string | undefined) {
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
  private setTemplate(template: string, instance?: any): void {
    (instance || this).shadow!.innerHTML = template;
  }

  /**
   * Set the style of the component
   * @date 2022-12-28 - 01:08:02
   *
   * @public
   * @param {string} style
   */
  private setStyle(style: string, instance?: any): void {
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

  /**
   * setupAcessorsForWatchedProps
   * Setup getters and setters for props to be watched
   * 
   * @param propertiesToWatch 
   * @returns 
   */
  private setupAcessorsForWatchedProps(propertiesToWatch: Set<string> | undefined) {
    console.log("setupAcessorsForWatchedProps for the following props:", new Array(...propertiesToWatch!));
    if (!propertiesToWatch) { return; }

    propertiesToWatch.forEach(propName => {
      console.log("defining getters and setters for", propName);
      Object.defineProperty(this, propName, {
        get: () => {
          console.log("get:", propName, "value:", this.watchedProperties.get("_" + propName))
          return this.watchedProperties.get("_" + propName);
        },

        set: (value: any) => {
          console.log("setting", propName, "to:", value)
          if (this.watchedProperties.get("_" + propName) === value) {
            console.log(propName, "already has value", value)
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
    });
  }

  /**
   * updateStringLiteralsInDOM
   * Set all elements with 'data-bind="propName"' innerHTML to new value
   * @param propName 
   */
  private updateStringLiteralsInDOM(propName: string, value: any) {
    console.log("updateStringLiteralsInDOM for", propName);
    const elements = this.shadowRoot?.querySelectorAll(`[data-bind='${propName}']`);
    elements?.forEach(e => {
      console.log("updating innerhtml for element", e);
      e.innerHTML = value;
    });
  }
}
