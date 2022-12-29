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
