import { ElementBase } from "../base/ElementBase";
import template from "./internal-binding.html";
import style from "./internal-binding.css";
import { CustomElement } from "../base/CustomElement";
import { getElementName } from "../base/utils/utils";

// @CustomElement(template, style)
export default class InternalBinding extends ElementBase {
  public mode = "untouched 🆕";

  constructor() {
    console.log("Constructor for InternalBinding started");
    super(template, style);
    console.log("Constructor for InternalBinding finished");
  }

  public clicked(): void {
    if (this.mode.startsWith("dark")) {
      this.mode = "light ☀️";
    } else {
      this.mode = "dark 🌒";
    }
  }
}

// define the element
window.customElements.define(getElementName(InternalBinding.name), InternalBinding);