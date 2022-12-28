import { ReactiveBase } from "./../base/reactive-base";
import template from "./advanced-component.html";
import style from "./style.css";

class AdvancedComponent extends ReactiveBase {
  constructor() {
    super(template, style);
  }
}

// Define the new element
customElements.define("advanced-component", AdvancedComponent);

export default AdvancedComponent;
