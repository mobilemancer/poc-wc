import { ReactiveBase } from "../base/ElementBase";
import { CustomElement } from "../base/CustomElement";

@CustomElement()
export default class TestElement extends ReactiveBase {

    public mode = "untouched 🆕";

    constructor(mockTemplate?: string, mockStyle?: string) {
        const defaultMockStyle = "";
        const defaultMockTemplate = '<button onclick="clicked">Change mode</button><p>${mode}</p>';
        super(mockTemplate ?? defaultMockTemplate, mockStyle ?? defaultMockStyle);
    }

    public clicked(): void {
        if (this.mode.startsWith("dark")) {
            this.mode = "light ☀️";
        } else {
            this.mode = "dark 🌒";
        }
    }
}
