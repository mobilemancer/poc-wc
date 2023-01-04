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
      if (node.parentNode?.nodeName === 'BODY') {
        result += node.outerHTML || node.nodeValue;
      }
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
  static stringLiteralReplacements: Set<string> = new Set();
  static findStringLiterals(elements: Element[]): Element[] {
    elements.filter(element => element.childElementCount === 0 && element.innerHTML.includes("${")).forEach(element => {
      let end = 0;
      while (element.innerHTML.indexOf("${", end) > -1) {
        let start = element.innerHTML.indexOf("${", end);
        end = element.innerHTML.indexOf("}", start);
        let stringLiteral = element.innerHTML.substring(start, end + 1);
        let stringLiteralName = element.innerHTML.substring(start + 2, end);

        if (!this.stringLiteralReplacements.has(stringLiteralName)) {
          this.stringLiteralReplacements.add(stringLiteralName);
        }

        element.innerHTML = element.innerHTML.replace(stringLiteral, `<span data-bind='${stringLiteralName}'></span>`);
      }
    });
    return elements;
  }

  static serializeElements(elements: Element[]) { }
}
