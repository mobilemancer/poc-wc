import { ReactiveBase } from "../base/ElementBase";
export default class TestElement extends ReactiveBase {
    mode: string;
    constructor(mockTemplate?: string, mockStyle?: string);
    clicked(): void;
}
