class HeaderComponent extends HTMLElement {
  private _text = "";
  get text() {
    return this.getAttribute("text") || "";
  }

  set text(value) {
    // this._text = value;
  }

  constructor() {
    // Always call super first in constructor
    super();

    // Create a shadow root
    const shadow = this.attachShadow({ mode: "open" });

    // Create header
    const header = document.createElement("h1");

    // Take attribute content and put it inside the info span
    // const text = this.getAttribute('data-text');
    header.textContent = this.text;

    // Create some CSS to apply to the shadow dom
    const style = document.createElement("style");

    style.textContent = `
         h1 {
            color: green;
         }
        `;
    shadow.appendChild(style);

    // Attach the created elements to the shadow dom
    shadow.appendChild(header);
  }
}

// Define the new element
customElements.define("header-component", HeaderComponent);

export default HeaderComponent;
