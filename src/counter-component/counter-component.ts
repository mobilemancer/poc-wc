import { ElementBase } from "../base/ElementBase";
import template from "./counter-component.html";
import style from "./counter-component.css";
import { registerElement } from "../base/utils/utils";

export class CounterComponent extends ElementBase {
    public count = 0;

    constructor() {
        super(template, style);
    }

    public inc() {
        this.count++;
    }

    public dec() {
        this.count--;
    }
}

// define the element
// window.customElements.define(
//     getElementName(CounterComponent.name),
//     CounterComponent
// );
registerElement(CounterComponent);