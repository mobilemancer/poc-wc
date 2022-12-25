class HeaderComponent2 extends HTMLElement {

    header;

    _text;
    get text() {
        return this._text || 'Hoopa unbound';
    }
    set text(value) {
        this._text = value;
        this.header.innerText = this._text;
    }

    _color = 'blue';
    get color() {
        return this._color || 'red';
    }
    set color(val) {
        this._color = val;
    }

    constructor() {
        console.log("Constructor for header-component2 started");

        // Always call super first in constructor
        super();

        // Create a shadow root
        const shadow = this.attachShadow({ mode: 'open' });

        // Create header
        this.header = document.createElement('h1');

        // Take attribute content and put it inside the info span
        // const text = this.getAttribute('data-text');
        this.header.textContent = this.text;

        // Create some CSS to apply to the shadow dom
        const style = document.createElement('style');

        style.textContent = `
         h1 {
            color: ${this.color};
         }
        `;
        shadow.appendChild(style);

        // Attach the created elements to the shadow dom
        shadow.appendChild(this.header);
    }
}

// Define the new element
customElements.define('header-component2', HeaderComponent2);

export default HeaderComponent2;