import { ElementBase } from "../base/ElementBase";
export default class InternalBinding extends ElementBase {
    mode: string;
    static get observedAttributes(): string[];
    constructor();
    clicked: () => void;
    connectedCallback(): void;
}
