class HeaderComponent2 extends HTMLElement {

    _text;
    get text() {
        // this._text = this.getAttribute('text') || '';
        // return this._text;

        return this.getAttribute('text') || 'Hoopa unbound';
    }

    set text(value) {
        // this._text = value;
    }

    constructor() {
        console.log("Constructor for header-component2 started");

        // Always call super first in constructor
        super();

        // Create a shadow root
        const shadow = this.attachShadow({ mode: 'open' });

        // Create header
        const header = document.createElement('h1');

        // Take attribute content and put it inside the info span
        // const text = this.getAttribute('data-text');
        header.textContent = this.text;

        // Create some CSS to apply to the shadow dom
        const style = document.createElement('style');

        style.textContent = `
         h1 {
            color: red;
         }
        `;
        shadow.appendChild(style);

        // Attach the created elements to the shadow dom
        shadow.appendChild(header);
    }
}

// Define the new element
customElements.define('header-component2', HeaderComponent2);

export default HeaderComponent2;