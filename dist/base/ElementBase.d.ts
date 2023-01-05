/**
 * ElementBase
 * Base functionality for web components
 *
 * @date 2022-12-28 - 01:08:02
 *
 * @export
 * @class ReactiveBase
 * @typedef {ElementBase}
 * @extends {HTMLElement}
 */
export declare class ElementBase extends HTMLElement {
    private mutationObserver;
    private watchedProperties;
    shadow: ShadowRoot | undefined;
    /**
     * Creates an instance of ElementBase.
     * @date 2022-12-28 - 01:08:02
     *
     * @constructor
     */
    constructor(template?: string, style?: string);
    connectedCallback(): void;
    disconnectedCallback(): void;
    adoptedCallback(): void;
    /**
     *  handles mutation observer callbacks
     * @param mutationList
     * @param observer
     */
    mutationObserverCallback(mutationList: any, observer: any): void;
    private parseTemplate;
    /**
     * Set the component template
     * @date 2022-12-28 - 01:08:02
     *
     * @public
     * @param {string} template
     */
    private setTemplate;
    /**
     * Set the style of the component
     * @date 2022-12-28 - 01:08:02
     *
     * @public
     * @param {string} style
     */
    private setStyle;
    /**
     * setupAcessorsForWatchedProps
     * Setup getters and setters for props to be watched
     *
     * @param propertiesToWatch
     * @returns
     */
    private setupAcessorsForWatchedProps;
    private createAccessorsForProperty;
    /**
     * updateStringLiteralsInDOM
     * Set all elements with 'data-bind="propName"' innerHTML to new value
     * @param propName
     */
    private updateStringLiteralsInDOM;
}
