export default class TemplateParser {
    static parse(template: string): string;
    static convertNodesToString(nodes: Element[]): string;
    /**
     *
     * @param template find all HTMLElements in the component template
     * @returns an array of all HTMLElements
     */
    static getElements(template: string): Array<Element>;
    static findStringLiterals(elements: Element[]): Element[];
    static serializeElements(elements: Element[]): void;
}
