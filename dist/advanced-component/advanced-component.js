import { ReactiveBase } from "./../base/reactive-base";
class AdvancedComponent extends ReactiveBase {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: "open" });
        // shadowRoot.innerHTML = `
        //       <p data-bind="title"></p>
        //     `;
        fetch("advanced-component.html")
            .then((stream) => stream.text())
            .then((text) => console.log(text));
    }
}
// Define the new element
customElements.define("advanced-component", AdvancedComponent);
export default AdvancedComponent;
