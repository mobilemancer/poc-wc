import TemplateParser from "./TemplateParser";

let template = '<div onclick="clicked()">apa</div>';
let template2 = "<div>${test}</div>";
let template2expected = '<div><span id="test0"></span></div>';

describe("accordion", () => {
  it("parse events", () => {
    const result = TemplateParser.parse(template);
    expect(result).toBe(template);
  });

  it("parse string literals", () => {
    const result = TemplateParser.parse(template2);
    expect(result).toBe(template2expected);
  });
});
