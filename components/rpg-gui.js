export class RPGGUI extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <slot></slot>
        `;
    }
}

export class AButton extends HTMLElement {
    constructor() {
        super();
        console.log("AButton constructor is called");
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        console.log("AButton connectedCallback called");
        this.shadowRoot.innerHTML = `
            <style>
            button {
              --button-color: #fff;
              --button-glow: rgba(255, 255, 255, 0.5);
              --button-bg: rgba(0, 0, 0, 0.8);

              font-family: 'Orbitron', sans-serif; /* Futuristic font, fallback to sans-serif */
              font-size: 16px;
              color: var(--button-color);
              background-color: var(--button-bg);

              height: 100%;
              width: 100%;
            }
            </style>
            <button>A</button>

        `;

        this.shadowRoot.querySelector('button').addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('a-button-press', { bubbles: true, composed: true }));
        });
    }
}