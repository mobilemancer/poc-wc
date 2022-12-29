import { ReactiveBase } from "./reactive-base";

// export function defineElementDeco(target: any): void {
//   console.log(`defining element ${ReactiveBase.getElementName(target.name)}`);
//   customElements.define(ReactiveBase.getElementName(target.name), target);
// }

export function defineElementDeco(target: any) {
  return function classDecorator<T extends { new (...args: any[]): {} }>(
    constructor: T
  ) {
    console.log("Define: " + constructor.name);
    const generated = class extends constructor {
      newProperty = "decorator";
      hello = "decorator";
    };
    window.customElements.define(
      ReactiveBase.getElementName(target.name),
      <any>generated
    );
    return generated;
  };
}
