export default class TemplateParser {
  static parse(template: string): string {
    const elements = this.getElements(template);
    const modifiedElements = this.findStringLiterals(elements);
    const templateString = this.convertNodesToString(modifiedElements);
    return templateString;
  }

  static convertNodesToString(nodes: Element[]): string {
    let result = "";
    nodes.forEach((node) => {
      result += node.outerHTML || node.nodeValue;
    });
    return result;
  }

  /**
   *
   * @param template find all HTMLElements in the component template
   * @returns an array of all HTMLElements
   */
  static getElements(template: string): Array<Element> {
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(template, "text/html");
    const allElements = htmlDoc.getElementsByTagName("*");
    const elementsArray = [...allElements];

    // the DOMParser adds a few elements we're not inteerested in, remove them and return the rest
    return elementsArray.filter(
      (e) =>
        e.tagName !== "HTML" && e.tagName !== "HEAD" && e.tagName !== "BODY"
    );
  }

  static stringLiteralCounter = 0;
  static stringLiteralReplacements = new Map<string, string[]>();
  static findStringLiterals(elements: Element[]): Element[] {
    elements.filter(element => element.innerHTML.includes("${")).forEach(element => {
      let end = 0;
      while (element.innerHTML.indexOf("${", end) > -1) {
        let start = element.innerHTML.indexOf("${", end);
        end = element.innerHTML.indexOf("}", start);
        let stringLiteral = element.innerHTML.substring(start, end + 1);
        let stringLiteralName = element.innerHTML.substring(start + 2, end);

        if (!this.stringLiteralReplacements.has(stringLiteralName)) {
          this.stringLiteralReplacements.set(stringLiteralName, []);
        }
        let idSuffix = this.stringLiteralReplacements
          .get(stringLiteralName)?.length;

        this.stringLiteralReplacements
          .get(stringLiteralName)
          ?.push(stringLiteralName + idSuffix);

        element.innerHTML = element.innerHTML.replace(
          stringLiteral,
          `<span id='${stringLiteralName + idSuffix
          }'></span>`
        );
      }
    });
    return elements;
  }

  static serializeElements(elements: Element[]) { }
}