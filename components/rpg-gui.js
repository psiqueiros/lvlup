export class RPGGUI extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: grid;
                    grid-template-columns: 1fr;
                    grid-template-rows: repeat(12, 1fr);
                }
                .arrow-button {
                    width: 100%;
                    height: 100%;
                }

                #up-arrow {
                    grid-row: 5/6;
                }

                #down-arrow {
                    grid-row: 7/8;
                }

            </style>
            <button class="arrow-button" id="up-arrow">▲</button>
            <slot></slot>
            <button class="arrow-button" id="down-arrow">▼</button>
        `;

        this.upArrow = this.shadowRoot.getElementById('up-arrow');
        this.downArrow = this.shadowRoot.getElementById('down-arrow');

        this.upArrow.addEventListener('click', () => this.navigate('up'));
        this.downArrow.addEventListener('click', () => this.navigate('down'));
    }

    navigate(direction) {
        const event = new CustomEvent('panel-navigation', {
            bubbles: true,
            composed: true,
            detail: { direction }
        });
        this.dispatchEvent(event);
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