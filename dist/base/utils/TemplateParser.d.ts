export default class TemplateParser {
    static parse(template: string): {
        templateString: string;
        propertiesToWatch: Set<string>;
    };
    static convertNodesToString(nodes: Element[]): string;
    /**
     *
     * @param template find all HTMLElements in the component template
     * @returns an array of all HTMLElements
     */
    static getElements(template: string): Array<Element>;
    static stringLiteralCounter: number;
    static replaceStringLiterals(elements: Element[]): {
        elements: Element[];
        propertiesToWatch: Set<string>;
    };
    static serializeElements(elements: Element[]): void;
}
