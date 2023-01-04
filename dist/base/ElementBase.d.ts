/**
 * Description placeholder
 * @date 2022-12-28 - 01:08:02
 *
 * @export
 * @class ReactiveBase
 * @typedef {ElementBase}
 * @extends {HTMLElement}
 */
export declare class ElementBase extends HTMLElement {
    /**
     * Description placeholder
     * @date 2022-12-28 - 01:08:02
     *
     * @private
     * @type {(ShadowRoot | undefined)}
     */
    shadow: ShadowRoot | undefined;
    /**
     * Description placeholder
     * @date 2022-12-28 - 01:08:02
     *
     * @private
     * @type {*}
     */
    private state;
    private mutationObserver;
    private watchedProperties;
    /**
     * Creates an instance of ReactiveBase.
     * @date 2022-12-28 - 01:08:02
     *
     * @constructor
     */
    constructor(template?: string, style?: string);
    setupAcessorsForWatchedProps(propertiesToWatch: Set<string> | undefined): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    adoptedCallback(): void;
    private addValuesToOnChangeWatchList;
    mutationObserverCallback(mutationList: any, observer: any): void;
    constructConnectedCallback(): string;
    constructConnectedCallbackString: string;
    private parseTemplate;
    /**
     * Update the component state
     * @date 2022-12-28 - 01:08:02
     *
     * @param {Object} newState
     */
    setState(newState: Object): void;
    /**
     * Description placeholder
     * @date 2022-12-28 - 01:08:02
     *
     * @param {*} value
     * @returns {boolean}
     */
    private isObject;
    /**
     * Set the component template
     * @date 2022-12-28 - 01:08:02
     *
     * @public
     * @param {string} template
     */
    setTemplate(template: string, instance?: any): void;
    /**
     * Set the style of the component
     * @date 2022-12-28 - 01:08:02
     *
     * @public
     * @param {string} style
     */
    setStyle(style: string, instance?: any): void;
}
