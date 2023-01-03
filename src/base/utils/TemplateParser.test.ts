import TemplateParser from "./TemplateParser";

let template2 = "<div>${test}</div>";
let template2expected = '<div><span id="test0"></span></div>';

let template3 = "<p>tihs is a pretty booring ${test}, but it ${test}s a lot</p>";
let template3expected = '<p>tihs is a pretty booring <span id="test1"></span>, but it <span id="test2"></span>s a lot</p>';

let template4 = "<p>tihs is a pretty booring ${xyz}, but it ${xyz}s a lot</p>";
let template4expected = '<p>tihs is a pretty booring <span id="xyz0"></span>, but it <span id="xyz1"></span>s a lot</p>';

describe("string literal parsing", () => {

  it("parse string literals", () => {
    const result = TemplateParser.parse(template2);
    expect(result).toBe(template2expected);
  });

  it("parse string literals, multi instance with used template", () => {
    const result = TemplateParser.parse(template3);
    expect(result).toBe(template3expected);
  });

  it("parse string literals, multi instance with unused template", () => {
    const result = TemplateParser.parse(template4);
    expect(result).toBe(template4expected);
  });

});
