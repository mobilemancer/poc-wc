import { ElementBase } from "./ElementBase";
import { getElementName } from "./utils/utils";

// function CustomElement() {
//   return function classDecorator<T extends { new(...args: any[]): {} }>(
//     customElement: T
//   ) {
//     // save a reference to the original constructor
//     var original = customElement;
//     let instance: any;
//     // the new constructor behaviour
//     var f: any = function (this: any, ...args: any) {
//       console.log("ClassWrapper: before class constructor", original.name);
//       // let instance = original.apply(this, args);
//       instance = new original(...args);
//       console.log("ClassWrapper: after class constructor", original.name);
//       return instance;
//     };

//     // copy prototype so intanceof operator still works
//     f.prototype = original.prototype;

//     /**
//      * Runs each time the element is appended to or moved in the DOM
//      */

//     // f.prototype.connectedCallback = (<any>original).super?.connectedCallback;
//     // customElement.prototype.connectedCallback || function () {};
//     // if (!instance?.constructConnectedCallbackString) {
//     //   customElement.prototype.connectedCallback =
//     //     function () {
//     //       if (!this) {
//     //         console.warn("Element is undefined?");
//     //         return;
//     //       }
//     //       console.log("This is from the decorator")
//     //     };
//     // } else {
//     //   customElement.prototype.connectedCallback = Function(instance?.constructConnectedCallbackString);
//     // }

//     // function () {
//     //   if (!this) {
//     //     console.warn("Element is undefined?");
//     //     return;
//     //   }
//     //   console.log("This is from the decorator")
//     // };

//     //   // Attach a click event listener to the button
//     //   let btn = this.querySelector("button");
//     //   if (!btn) return;
//     //   btn.addEventListener("click", function (event: any) {
//     //     console.log("clicked");
//     //   });
//     // };

//     // define the custom element
//     window.customElements.define(
//       getElementName(customElement.name),
//       <any>customElement
//     );

//     // return new constructor (will override original)
//     return f;
//   }
// };

// const CustomElement = (template?: string, style?: string): any => (customElement: ElementBase) => {
// function CustomElement(template?: string, style?: string) {
//   return function classDecorator<T extends { new(...args: any[]): {} }>(
//     customElement: T
//   ) {
//     console.log(`Decorator started for ${(<any>customElement).name}`);

//     // save a reference to the original constructor
//     const original = <any>customElement;
//     // the new constructor behaviour
//     const f: any = function (this: any, ...args: any) {
//       console.log("ClassWrapper: before class constructor", (original).name);
//       let instance = original.apply(this, args);
//       // let instance = new (<any>original)(...args);
//       console.log("ClassWrapper: after class constructor", (original).name);

//       setTemplate(template, instance);

//       setStyle(style, template, <any>customElement);

//       const connectedCallback = (<any>customElement).prototype.connectedCallback || function () { };
//       (<any>instance).prototype.connectedCallback = function () {
//         console.log("This is conCB specified in the decorator")
//         connectedCallback.call(this);
//       };

//       // define the element
//       window.customElements.define(getElementName((<any>customElement).name), <any>customElement);

//       return instance;
//     };

//     console.log(original);

//     // copy prototype so intanceof operator still works
//     f.prototype = original.prototype;

//     console.log(f);
//     return f;

//   }
// }

export function CustomElement(template?: string, style?: string) {
  console.log(`Decorator factory called`);

  return function (customElement: any) {
    console.log(`Decorator started for ${(<any>customElement)?.name}`);



    // save a reference to the original constructor
    var original = customElement;

    // the new constructor behaviour
    var f: any = function (this: any, ...args: any[]) {
      console.log(
        `ClassWrapper: before class constructor ${(<any>customElement)?.name}`
      );

      // let instance = original.apply(this, args);
      let instance = new customElement(...args);
      console.log(
        `ClassWrapper: after class constructor ${(<any>customElement)?.name}`
      );

      this.setTemplate(template, instance);
      this.setStyle(style, instance);

      const connectedCallback =
        (<any>customElement).prototype.connectedCallback || function () { };

      (<any>instance).connectedCallback = function () {
        console.log("This is conCB specified in the decorator");

        // define the element
        window.customElements.define(
          getElementName((<any>customElement).name),
          <any>customElement
        );

        // append the elements own callback if it was defined
        connectedCallback.call(this);
      };

      return instance;
    };

    // copy prototype so intanceof operator still works
    f.prototype = original.prototype;

    // return new constructor (will override original)
    return f;
  };
}

// function setStyle(
//   style: string | undefined,
//   template: string | undefined,
//   customElement: ElementBase
// ) {
//   if (style && template) {
//     customElement.setStyle(style);
//   }
// }

// function setTemplate(template: string | undefined, customElement: ElementBase) {
//   if (!template) {
//     console.info(
//       `No template provided for element ${getElementName(
//         (<any>customElement).name
//       )}`
//     );
//   } else {
//     debugger;
//     customElement.setTemplate(template);
//   }
// }
