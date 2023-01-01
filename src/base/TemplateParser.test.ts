import TemplateParser from "./TemplateParser";

let template = "<div onclick='clicked()'>apa</div>";
let template2 = "<div>${test}</div>";

describe("accordion", () => {
  it("initialise component", () => {
    const result = TemplateParser.parse(template);
    expect(result.length).toBe(1);
  });

  it("initialise component with scope", () => {
    const result = TemplateParser.parse(template2);
    expect(result.length).toBe(1);
  });
});
