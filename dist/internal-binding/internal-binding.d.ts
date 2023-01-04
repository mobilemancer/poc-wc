import { ElementBase } from "../base/ElementBase";
export default class InternalBinding extends ElementBase {
    mode: string;
    static get observedAttributes(): string[];
    constructor();
    clicked: () => void;
    attributeChangedCallback(name: string, oldValue: any, newValue: any): void;
    connectedCallback(): void;
}
