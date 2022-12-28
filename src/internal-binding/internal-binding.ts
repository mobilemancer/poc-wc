import { ReactiveBase } from "../base/reactive-base";
import template from "./internal-binding.html";
import style from "./internal-binding.css";

@defineElementDeco
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
customElements.define(
  ReactiveBase.getElementName(InternalBinding.name),
  InternalBinding
);

function defineElementDeco<T extends { new (...args: any[]): {} }>(
  constructor: T
) {
  console.log(ReactiveBase.getElementName(constructor.name));
}
