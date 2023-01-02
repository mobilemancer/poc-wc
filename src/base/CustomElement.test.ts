import TestElement from "../test-element/test-element";

describe("CustomElement decorator tests", () => {

    it("connectedCallback set to default", () => {
        const element = new TestElement();
        const expectedCB = `connectedCallback() {
        console.log("Connected callback");
    }`.replace(/\s+/g, '');
        expect((<any>element).prototype.connectedCallback.toString().replace(/\s+/g, '')).toBe(expectedCB);
    });

});