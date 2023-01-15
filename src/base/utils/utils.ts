/**
 * Returns the name of the element
 *
 * @param className name of the custom element class
 * @returns an hyphenated element name
 */
function getElementName(className: string): string {
    const wordRegex = /[A-Z]?[a-z]+|[0-9]+|[A-Z]+(?![a-z])/g;
    const resultingWords = className.match(wordRegex);
    return !!resultingWords ? resultingWords.join("-").toLowerCase() : "";
}

function registerElement(component: any): void {

    window.customElements.define(
        getElementName(component.name),
        component
    );

}

export { getElementName };
export { registerElement };