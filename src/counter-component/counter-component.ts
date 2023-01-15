import { ElementBase } from "../base/ElementBase";
import template from "./counter-component.html";
import style from "./counter-component.css";
import { registerElement } from "../base/utils/utils";
import TemplateParser from "../base/utils/TemplateParser";

export class CounterComponent extends ElementBase {
    public count = 0;

    constructor() {
        super(template, style);

        TemplateParser.connectEventHandlers(this);
    }

    public inc() {
        this.count++;
        console.log(this.count);
    }

    // public dec() {
    //     this.count--;
    // }

    public dec = () => {
        alert("dec");
        this.count--;
        console.log(this.count);
    };
}

// define the element
// window.customElements.define(
//     getElementName(CounterComponent.name),
//     CounterComponent
// );
registerElement(CounterComponent);