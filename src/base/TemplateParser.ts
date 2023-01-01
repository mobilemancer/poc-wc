export default class TemplateParser {
  static parse(template: string): Array<string> {
    const tags = this.findElements(template);
    return tags;
  }

  static findElements(template: string) {
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(template, "text/html");
    const allElements = htmlDoc.getElementsByTagName("*");
    const result = [];
    for (let index = 0; index < allElements.length; index++) {
      const element = allElements[index];
      if (element.hasAttribute("onclick")) {
        result.push(element.tagName);
      }
    }
    return result;
  }
}
