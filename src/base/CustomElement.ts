import { ReactiveBase } from "./reactive-base";

// export function defineElementDeco(target: any): void {
//   console.log(`defining element ${ReactiveBase.getElementName(target.name)}`);
//   customElements.define(ReactiveBase.getElementName(target.name), target);
// }

export function defineElementDeco() {
  return function classDecorator<T extends { new (...args: any[]): {} }>(
    constructor: T
  ) {
    console.log("Define: " + constructor.name);

    //extend the class
    const generated = class extends constructor {
      newProperty = "decorator";
      hello = "decorator";
    };

    // define the custom element
    window.customElements.define(
      ReactiveBase.getElementName(constructor.name),
      <any>generated
    );

    return generated;
  };
}

export function defineClass() {
  return function classDecorator<T extends { new (...args: any[]): {} }>(
    constructor: T
  ) {
    console.log("Define: " + constructor.name);
    const generated = class extends constructor {
      newProperty = "decorator";
      hello = "decorator";
    };
    window.customElements.define(
      ReactiveBase.getElementName(constructor.name),
      <any>generated
    );
    return generated;
  };
}

export const CustomElement = () => (cls: any) => {
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
    if (!btn) return;
    btn.addEventListener("click", function (event: any) {
      console.log("clicked");
    });
  };

  window.customElements.define(ReactiveBase.getElementName(cls.name), <any>cls);
};
