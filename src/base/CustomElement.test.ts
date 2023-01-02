import { InternalBinding } from "../main";

describe("CustomElement decorator tests", () => {

    it("connectedCallback set", () => {
        const element = new InternalBinding();

        expect((<any>element).prototype.connectedCallback).toBe("");
    });

});