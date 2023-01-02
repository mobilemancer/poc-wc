import { ReactiveBase } from "./ElementBase";

// // export function defineElementDeco(target: any): void {
// //   console.log(`defining element ${ReactiveBase.getElementName(target.name)}`);
// //   customElements.define(ReactiveBase.getElementName(target.name), target);
// // }

// export function defineElementDeco() {
//   return function classDecorator<T extends { new(...args: any[]): {} }>(
//     constructor: T
//   ) {
//     console.log("Define: " + constructor.name);

//     //extend the class
//     const generated = class extends constructor {
//       newProperty = "decorator";
//       hello = "decorator";
//     };

//     // define the custom element
//     window.customElements.define(
//       ReactiveBase.getElementName(constructor.name),
//       <any>generated
//     );

//     return generated;
//   };
// }

// export function defineClass() {
//   return function classDecorator<T extends { new(...args: any[]): {} }>(
//     constructor: T
//   ) {
//     console.log("Define: " + constructor.name);
//     const generated = class extends constructor {
//       newProperty = "decorator";
//       hello = "decorator";
//     };
//     window.customElements.define(
//       ReactiveBase.getElementName(constructor.name),
//       <any>generated
//     );
//     return generated;
//   };
// }

// export const CustomElement = () => (customElement: any) => {
export function CustomElement() {
  return function classDecorator<T extends { new(...args: any[]): {} }>(
    customElement: T
  ) {
    // save a reference to the original constructor
    var original = customElement;

    // the new constructor behaviour
    var f: any = function (this: any, ...args: any) {
      console.log("ClassWrapper: before class constructor", original.name);
      // let instance = original.apply(this, args);
      let instance = new original(...args);
      console.log("ClassWrapper: after class constructor", original.name);
      return instance;
    };

    // copy prototype so intanceof operator still works
    f.prototype = original.prototype;

    /**
     * Runs each time the element is appended to or moved in the DOM
     */

    // f.prototype.connectedCallback = (<any>original).super?.connectedCallback;
    // customElement.prototype.connectedCallback || function () {};
    customElement.prototype.connectedCallback = function () {
      if (!this) {
        console.warn("Element is undefined?");
        return;
      }
      console.log("This is from the decorator")
    };

    //   // Attach a click event listener to the button
    //   let btn = this.querySelector("button");
    //   if (!btn) return;
    //   btn.addEventListener("click", function (event: any) {
    //     console.log("clicked");
    //   });
    // };

    // define the custom element
    window.customElements.define(
      ReactiveBase.getElementName(customElement.name),
      <any>customElement
    );

    // return new constructor (will override original)
    return f;
  }
};
