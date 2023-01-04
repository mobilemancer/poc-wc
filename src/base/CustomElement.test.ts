import TestElement from "../test-element/test-element";

let template1 = "<div class=\"test-class\">A very simple element</div>";
let expected1 = "<div class=\"test-class\">A very simple element</div>";
let style1 = ".test-class { color: black; }";
const expectedCB =
    "connectedCallback(){console.log(`Connectedcallbackoriginal-${this===null||this===void0?void0:this.tagName}`);}".replace(
        /\s+/g,
        ""
    );

describe("CustomElement tests", () => {
    // it("connectedCallback defaults to console log statement", () => {
    //     const element = new TestElement();
    //     const expectedCB = `connectedCallback() {   console.log("Connected callback");    }`.replace(/\s+/g, '');
    //     expect((<any>element).prototype.connectedCallback.toString().replace(/\s+/g, '')).toBe(expectedCB);
    // });

    //   it("connectedCallback initiated with callbacks", () => {
    //     const element = new TestElement(template1, "");
    //     expect(
    //       (<any>element).connectedCallback.toString().replace(/\s+/g, "")
    //     ).toBe(expectedCB);
    //   });

    it("element can be initiated with template", () => {
        const element = new TestElement(template1, "");
        expect(!!element).toBe(true);
    });

    it("element has correct template", () => {
        const element = new TestElement(template1, "");
        expect(element.shadowRoot?.innerHTML).toBe(template1);
    });


    // it("element has correct styling", () => {
    //     const element = new TestElement(template1, style1);
    //     const div = element?.shadowRoot?.querySelector('div');
    //     if (!div) throw "template not correctly initiated";
    //     expect(window.getComputedStyle(div).getPropertyValue('color')).toBe('black');
    // });

});
