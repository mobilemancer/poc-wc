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

  connectedCallback() {
    console.log("connected callback");
  }
}

// Define the new element
// customElements.define(
//   ReactiveBase.getElementName(InternalBinding.name),
//   InternalBinding
// );

function defineElementDeco(target: any): void {
  console.log(`defining element ${ReactiveBase.getElementName(target.name)}`);
  customElements.define(ReactiveBase.getElementName(target.name), target);
}
