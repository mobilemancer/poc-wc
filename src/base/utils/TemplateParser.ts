import { InternalBinding } from "../../main";

export default class TemplateParser {
  static connectEventHandlers(webComponent: HTMLElement) {
    const elements = webComponent.shadowRoot?.querySelectorAll("[data-onclick]");
    console.log("Found elements:", elements?.length);
    elements?.forEach(element => {
      console.log("element:", element);
      const methodName = element.getAttribute("[data-onclick]");
      console.log("method name:", methodName);
      if (methodName) {
        element.addEventListener("onclick", (<any>webComponent)[methodName]);
        console.log("added method:", (<any>webComponent)[methodName]);
      }
    });

  }

  static parse(template: string): { templateString: string, propertiesToWatch: Set<string> } {
    const elements = this.getElements(template);
    const elementsAndPropsToWatch = this.replaceStringLiterals(elements);
    elementsAndPropsToWatch.elements = this.replaceEventHandlers(elementsAndPropsToWatch.elements);
    const propertiesToWatch = elementsAndPropsToWatch.propertiesToWatch;
    const templateString = this.convertNodesToString(elementsAndPropsToWatch.elements);
    return { templateString, propertiesToWatch };
  }

  static replaceEventHandlers(elements: Element[]): Element[] {
    elements.forEach(e => {
      const methodName = e.getAttribute("onclick");
      if (methodName) {
        e.removeAttribute("onclick");
        e.setAttribute("data-onclick", methodName);
      }

    });

    return elements;
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
  static replaceStringLiterals(elements: Element[]): { elements: Element[], propertiesToWatch: Set<string> } {
    // gather all property names used in string literals
    const propertiesToWatch: Set<string> = new Set();

    // walk over all leaf elements and check for string literals
    elements.filter(element => element.childElementCount === 0 && element.innerHTML.includes("${")).forEach(element => {
      let end = 0;
      while (element.innerHTML.indexOf("${", end) > -1) {
        let start = element.innerHTML.indexOf("${", end);
        end = element.innerHTML.indexOf("}", start);
        let stringLiteral = element.innerHTML.substring(start, end + 1);
        let stringLiteralName = element.innerHTML.substring(start + 2, end);

        if (!propertiesToWatch.has(stringLiteralName)) {
          propertiesToWatch.add(stringLiteralName);
        }

        // replace string literal with a span that has a data-binding attr
        element.innerHTML = element.innerHTML.replace(stringLiteral, `<span data-bind='${stringLiteralName}'></span>`);
      }
    });
    return { elements, propertiesToWatch };
  }

  static serializeElements(elements: Element[]) { }
}
