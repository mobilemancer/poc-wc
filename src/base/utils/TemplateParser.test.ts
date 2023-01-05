import TemplateParser from "./TemplateParser";

let template2 = "<div>${test}</div>";
let template2expected = '<div><span data-bind="test"></span></div>';

let template3 = "<p>tihs is a pretty booring ${test1}, but it ${test2}s a lot</p>";
let template3expected = '<p>tihs is a pretty booring <span data-bind="test1"></span>, but it <span data-bind="test2"></span>s a lot</p>';

let template4 = "<p>tihs is a pretty booring ${xyz}, but it ${xyz}s a lot</p>";
let template4expected = '<p>tihs is a pretty booring <span data-bind="xyz"></span>, but it <span data-bind="xyz"></span>s a lot</p>';

let template5 = '<div class="internal-binding"><button onclick="clicked">Change mode</button><p>${mode}</p></div>';
let template5expected = '<div class="internal-binding"><button data-onclick="clicked">Change mode</button><p><span data-bind="mode"></span></p></div>';


describe("string literal parsing", () => {

  it("parse string literals", () => {
    const result = TemplateParser.parse(template2);
    expect(result.templateString).toBe(template2expected);
  });

  it("parse string literals, multi instance with used template", () => {
    const result = TemplateParser.parse(template3);
    expect(result.templateString).toBe(template3expected);
  });

  it("parse string literals, multi instance with unused template", () => {
    const result = TemplateParser.parse(template4);
    expect(result.templateString).toBe(template4expected);
  });

  it("parse string literals, nested elements", () => {
    const result = TemplateParser.parse(template5);
    expect(result.templateString).toBe(template5expected);
  });

});


let template6 = '<button onclick="clicked">Change mode</button>';
let template6expected = '<button data-onclick="clicked">Change mode</button>';

describe("event handler parsing", () => {
  it("parse onclick eventhandler", () => {
    const result = TemplateParser.parse(template6);
    expect(result.templateString).toBe(template6expected);
  });
});