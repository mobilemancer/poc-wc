class AdvancedComponent extends ReactiveBase {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.innerHTML = `
          <p data-bind="title"></p>
        `;
  }
}

// Define the new element
customElements.define("advanced-component", AdvancedComponent);

export default AdvancedComponent;
