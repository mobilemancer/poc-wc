import { ReactiveBase } from "./../base/reactive-base";
import template from './advanced-component.html';

class AdvancedComponent extends ReactiveBase {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });

    // shadowRoot.innerHTML = `
    //       <p data-bind="title"></p>
    //     `;

    console.log("html?");
    console.table(template);

    // fetch("../dist/advanced-component.html")
    //   .then((stream) => stream.text())
    //   .then((text) => console.log(text));
  }
}

// Define the new element
customElements.define("advanced-component", AdvancedComponent);

export default AdvancedComponent;
