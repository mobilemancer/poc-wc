import { ElementBase } from "../base/ElementBase";
import template from "./internal-binding.html";
import style from "./internal-binding.css";
import { getElementName } from "../base/utils/utils";
import TemplateParser from "../base/utils/TemplateParser";

export default class InternalBinding extends ElementBase {
  public mode = "untouched 🆕";

  constructor() {
    super(template, style);

    // const btn = this?.shadowRoot?.querySelector("button");
    // if (btn) {
    //   btn.onclick = this.clicked;
    // }

    TemplateParser.connectEventHandlers(this);
  }

  clicked = () => {
    if (this.mode.startsWith("dark")) {
      this.mode = "light ☀️";
    } else {
      this.mode = "dark 🌒";
    }
  };

  // override connectedCallback(): void {
  //   console.log("callback from internal-binding");
  // }
}

// define the element
window.customElements.define(
  getElementName(InternalBinding.name),
  InternalBinding
);
