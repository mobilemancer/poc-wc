import { ElementBase } from "../base/ElementBase";
import template from "./counter-component.html";
import style from "./counter-component.css";

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