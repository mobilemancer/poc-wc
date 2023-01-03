import { ElementBase } from "../base/ElementBase";
import template from "./internal-binding.html";
import style from "./internal-binding.css";
import { CustomElement } from "../base/CustomElement";

@CustomElement(template, style)
export default class InternalBinding extends ElementBase {
  public mode = "untouched 🆕";

  constructor() {
    super();
  }

  public clicked(): void {
    if (this.mode.startsWith("dark")) {
      this.mode = "light ☀️";
    } else {
      this.mode = "dark 🌒";
    }
  }
}
