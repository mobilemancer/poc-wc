import { ElementBase } from "../base/ElementBase";
import template from "./advanced-component.html";
import style from "./style.css";

class AdvancedComponent extends ElementBase {
  constructor() {
    super(template, style);
  }
}

// Define the new element
customElements.define("advanced-component", AdvancedComponent);

export default AdvancedComponent;
