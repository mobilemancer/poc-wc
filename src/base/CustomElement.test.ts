import TestElement from "../test-element/test-element";

let template1 = "<div>${test}</div>";

describe("CustomElement decorator tests", () => {

    // it("connectedCallback defaults to console log statement", () => {
    //     const element = new TestElement();
    //     const expectedCB = `connectedCallback() {   console.log("Connected callback");    }`.replace(/\s+/g, '');
    //     expect((<any>element).prototype.connectedCallback.toString().replace(/\s+/g, '')).toBe(expectedCB);
    // });

    it("connectedCallback initiated with callbacks", () => {
        const element = new TestElement(template1, '');
        const expectedCB = `function(){//constclone=document.importNode(element.content,true);//this.attachShadow({mode:'open'}).appendChild(clone);console.log(\"ThisisconCBspecifiedinthedecorator\");connectedCallback.call(this);}`.replace(/\s+/g, '');
        expect((<any>element).connectedCallback.toString().replace(/\s+/g, '')).toBe(expectedCB);
    });

});