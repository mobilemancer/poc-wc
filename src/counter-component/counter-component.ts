import { ElementBase } from "../base/ElementBase";
import template from "./counter-component.html";
import style from "./counter-component.css";
import { registerElement } from "../base/utils/utils";
import TemplateParser from "../base/utils/TemplateParser";

export class CounterComponent extends ElementBase {
    public count = 0;

    constructor() {
        // 1. Init element with template and style
        super(template, style);

        // 2 . Connect event handlers
        TemplateParser.connectEventHandlers(this);
    }

    public inc() {
        this.count++;
    }

    public dec() {
        this.count--;
    }
}


// 3. Register the element
registerElement(CounterComponent);