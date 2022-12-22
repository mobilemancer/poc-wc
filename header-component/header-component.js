class HeaderComponent extends HTMLElement {
    constructor() {
        console.log("Constructor for header-component started");

        // Always call super first in constructor
        super();

        // Create a shadow root
        const shadow = this.attachShadow({ mode: 'open' });

        // Create header
        const header = document.createElement('span');
        header.setAttribute('class', 'info');

        // Take attribute content and put it inside the info span
        const text = this.getAttribute('data-text');
        header.textContent = text;

        // Create some CSS to apply to the shadow dom
        console.log("setting up style");
        const style = document.createElement('style');
        console.log(style.isConnected);

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
customElements.define('header-component', HeaderComponent);

export default HeaderComponent;