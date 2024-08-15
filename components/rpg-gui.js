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

              padding: 10px 20px;
              font-family: 'Orbitron', sans-serif; /* Futuristic font, fallback to sans-serif */
              font-size: 16px;
              color: var(--button-color);
              background-color: var(--button-bg);
              border: 2px solid var(--button-color);
              border-radius: 5px;
              box-shadow: 0 0 10px var(--button-glow);
              cursor: pointer;
              transition: all 0.3s ease;
              position: relative;
              overflow: hidden;
            }

            button::before {
              content: '';
              position: absolute;
              top: -2px;
              left: -2px;
              right: -2px;
              bottom: -2px;
              background: linear-gradient(45deg, var(--button-color), transparent, var(--button-color));
              z-index: -1;
              filter: blur(5px);
              opacity: 0;
              transition: opacity 0.3s ease;
            }

            button:hover {
              color: #ffffff;
              text-shadow: 0 0 5px var(--button-glow);
            }

            button:hover::before {
              opacity: 1;
            }

            button:active {
              transform: scale(0.95);
              box-shadow: 0 0 5px var(--button-glow);
            }

            @keyframes button-pulse {
              0% { box-shadow: 0 0 10px var(--button-glow); }
              50% { box-shadow: 0 0 20px var(--button-glow), 0 0 30px var(--button-glow); }
              100% { box-shadow: 0 0 10px var(--button-glow); }
            }

            button:focus {
              outline: none;
              animation: button-pulse 1.5s infinite;
            }
            </style>
            <button>A</button>

        `;

        this.shadowRoot.querySelector('button').addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('a-button-press', { bubbles: true, composed: true }));
        });
    }
}