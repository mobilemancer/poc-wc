import TemplateParser from "./TemplateParser";

let template = "<div onclick=\"clicked()\">apa</div>";
let template2 = "<div>${test}</div>";

describe("accordion", () => {
  it("parse events", () => {
    const result = TemplateParser.parse(template);
    expect(result).toBe(template);
  });

  it("parse string literals", () => {
    const result = TemplateParser.parse(template2);
    expect(result).toBe("<div><template>stringLiteral</template></div>");
  });
});
