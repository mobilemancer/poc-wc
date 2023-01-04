import { ElementBase } from "../base/ElementBase";
import template from "./internal-binding.html";
import style from "./internal-binding.css";
import { CustomElement } from "../base/CustomElement";
import { getElementName } from "../base/utils/utils";

// @CustomElement(template, style)
export default class InternalBinding extends ElementBase {
  public mode = "untouched 🆕";

  static get observedAttributes() {
    console.log("getting observed attributes");
    console.log(ElementBase.observedAttributesArray);
    return ElementBase.observedAttributesArray;
  }

  constructor() {
    console.log("Constructor for InternalBinding started");
    super(template, style);

    console.table();
    const btn = this?.shadowRoot?.querySelector("button");
    if (btn) {
      btn.onclick = this.clicked;
    }
    console.log("Constructor for InternalBinding finished");
  }

  clicked = () => {
    if (this.mode.startsWith("dark")) {
      this.mode = "light ☀️";
    } else {
      this.mode = "dark 🌒";
    }
    console.log(this.mode);
  };

  override connectedCallback(): void {
    console.log("callback from internal-binding");
  }
}

// define the element
window.customElements.define(
  getElementName(InternalBinding.name),
  InternalBinding
);
