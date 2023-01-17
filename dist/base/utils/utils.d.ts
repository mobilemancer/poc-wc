/**
 * Returns the name of the element
 *
 * @param className name of the custom element class
 * @returns an hyphenated element name
 */
declare function getElementName(className: string): string;
/**
 *
 * @param component Register a custom element
 */
declare function registerElement(component: any): void;
export { getElementName };
export { registerElement };
