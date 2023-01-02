import { ReactiveBase } from "../base/ElementBase";
export default class TestElement extends ReactiveBase {
    private static mockStyle;
    private static mockTemplate;
    mode: string;
    constructor(testTemplate?: string, testStyle?: string);
    clicked(): void;
}
