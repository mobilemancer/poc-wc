import { ReactiveBase } from "../base/reactive-base";
import template from "./internal-binding.html";
import style from "./internal-binding.css";

export default class InternalBinding extends ReactiveBase {
  public mode = "untouched 🆕";
  constructor() {
    super(template, style);
  }

  public clicked(): void {
    if (this.mode.startsWith("dark")) {
      this.mode = "light ☀️";
    } else {
      this.mode = "dark 🌒";
    }
  }
}

// Define the new element
customElements.define("indernal-binding", InternalBinding);
