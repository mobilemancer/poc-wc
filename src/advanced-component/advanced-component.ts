import { ReactiveBase } from "./../base/reactive-base";
import template from "./advanced-component.html";
import style from "./style.css";

class AdvancedComponent extends ReactiveBase {
  constructor() {
    super(template, style);

    // const shadowRoot = this.attachShadow({ mode: "open" });
    // shadowRoot.innerHTML = template;

    // const styleElement = document.createElement("style");
    // // style.textContent = advancedcomponent;
    // console.log(style);
    // shadowRoot.appendChild(styleElement);
  }
}

// Define the new element
customElements.define("advanced-component", AdvancedComponent);

export default AdvancedComponent;
