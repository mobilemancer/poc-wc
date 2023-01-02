import { ReactiveBase } from "../base/ElementBase";
import { CustomElement } from "../base/CustomElement";

@CustomElement()
export default class TestElement extends ReactiveBase {
    private static mockStyle = "";
    private static mockTemplate = '<button onclick="clicked">Change mode</button><p>${mode}</p>';

    public mode = "untouched 🆕";

    constructor(testTemplate?: string, testStyle?: string) {
        super(testTemplate ?? TestElement.mockTemplate, testStyle ?? TestElement.mockStyle);
    }

    public clicked(): void {
        if (this.mode.startsWith("dark")) {
            this.mode = "light ☀️";
        } else {
            this.mode = "dark 🌒";
        }
    }

    // connectedCallback(){
    //     super.connectedCallback();
    // }
}
