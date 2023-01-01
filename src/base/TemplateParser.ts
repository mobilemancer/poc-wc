export default class TemplateParser {
  static parse(template: string): string {
    const elements = this.getElements(template);
    const modifiedElements = this.findStringLiterals(elements);
    const templateString = this.convertNodesToString(modifiedElements);
    return templateString;
  }

  static convertNodesToString(nodes: Element[]): string {
    let result = "";
    nodes.forEach(node => {
      result += (node.outerHTML || node.nodeValue);
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
    return elementsArray.filter(e => (e.tagName !== 'HTML' && e.tagName !== 'HEAD' && e.tagName !== 'BODY'));
  }

  static findStringLiterals(elements: Element[]) {

    elements.forEach(element => {
      if (element.innerHTML.includes('${')) {

        let index = 0;
        while (element.innerHTML.indexOf('${', index) > -1) {
          let start = element.innerHTML.indexOf('${', index);
          let end = element.innerHTML.indexOf('}', start);
          let stringLiteral = element.innerHTML.substring(start, end + 1);

          // TODO: change too <span slot="my-text">...
          element.innerHTML = element.innerHTML.replace(stringLiteral, '<template>stringLiteral</template>');
          index = end + 1;
        }

      }
    });
    return elements;
  }

  static serializeElements(elements: Element[]) {

  }

}
