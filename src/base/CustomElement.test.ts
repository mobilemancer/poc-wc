import TestElement from "../test-element/test-element";

let template1 = "<div>${test}</div>";
const expectedCB =
  "connectedCallback(){console.log(`Connectedcallbackoriginal-${this===null||this===void0?void0:this.tagName}`);}".replace(
    /\s+/g,
    ""
  );

describe("CustomElement decorator tests", () => {
  // it("connectedCallback defaults to console log statement", () => {
  //     const element = new TestElement();
  //     const expectedCB = `connectedCallback() {   console.log("Connected callback");    }`.replace(/\s+/g, '');
  //     expect((<any>element).prototype.connectedCallback.toString().replace(/\s+/g, '')).toBe(expectedCB);
  // });

  it("connectedCallback initiated with callbacks", () => {
    const element = new TestElement(template1, "");
    expect(
      (<any>element).connectedCallback.toString().replace(/\s+/g, "")
    ).toBe(expectedCB);
  });
});
