import { ElementBase } from "../base/ElementBase";
export default class TestElement extends ElementBase {
    mode: string;
    constructor(mockTemplate?: string, mockStyle?: string);
    clicked(): void;
}
