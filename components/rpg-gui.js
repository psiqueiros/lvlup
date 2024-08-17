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
                .button {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: linear-gradient(145deg, #2e2e2e, #272727);
                    box-shadow: 5px 5px 10px #1c1c1c,
                                -5px -5px 10px #383838;
                    cursor: pointer;
                    transition: all 0.1s ease;
                    position: relative;
                    overflow: hidden;
                    border: none;
                    outline: none;
                }
                .button::after {
                    content: '';
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 50%;
                    opacity: 0;
                    transition: opacity 0.2s;
                }
                .button:hover::after {
                    opacity: 1;
                }
                .button:active {
                    box-shadow: inset 5px 5px 10px #1c1c1c,
                                inset -5px -5px 10px #383838;
                }
                .button-arrow {
                    font-size: 24px;
                    color: #00ffff;
                    text-shadow: 0 0 5px #00ffff, 0 0 10px #00ffff;
                }
                #up-arrow {
                    grid-row: 4/5;
                    justify-self: center;
                    align-self: center;
                }
                #down-arrow {
                    grid-row: 6/7;
                    justify-self: center;
                    align-self: center;
                }
                @keyframes neon-pulse {
                    0%, 100% {
                        filter: drop-shadow(0 0 2px currentColor) drop-shadow(0 0 5px currentColor);
                    }
                    50% {
                        filter: drop-shadow(0 0 5px currentColor) drop-shadow(0 0 10px currentColor);
                    }
                }
                .button:hover .button-text {
                    animation: neon-pulse 1.5s infinite;
                }
            </style>
            <button class="button button-arrow" id="up-arrow">
                <span class="button-text">▲</span>
            </button>
            <slot></slot>
            <button class="button button-arrow" id="down-arrow">
                <span class="button-text">▼</span>
            </button>
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
                .button {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: linear-gradient(145deg, #2e2e2e, #272727);
                    box-shadow: 5px 5px 10px #1c1c1c,
                                -5px -5px 10px #383838;
                    cursor: pointer;
                    transition: all 0.1s ease;
                    position: relative;
                    overflow: hidden;
                    border: none;
                    outline: none;
                }
                .button::after {
                    content: '';
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 50%;
                    opacity: 0;
                    transition: opacity 0.2s;
                }
                .button:hover::after {
                    opacity: 1;
                }
                .button:active {
                    box-shadow: inset 5px 5px 10px #1c1c1c,
                                inset -5px -5px 10px #383838;
                }
                .button-text {
                    font-family: 'Orbitron', sans-serif;
                    font-size: 24px;
                    color: #ff00ff;
                    text-shadow: 0 0 5px #ff00ff, 0 0 10px #ff00ff;
                }
                @keyframes neon-pulse {
                    0%, 100% {
                        filter: drop-shadow(0 0 2px currentColor) drop-shadow(0 0 5px currentColor);
                    }
                    50% {
                        filter: drop-shadow(0 0 5px currentColor) drop-shadow(0 0 10px currentColor);
                    }
                }
                .button:hover .button-text {
                    animation: neon-pulse 1.5s infinite;
                }
            </style>
            <button class="button">
                <span class="button-text">A</span>
            </button>
        `;
        this.shadowRoot.querySelector('button').addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('a-button-press', { bubbles: true, composed: true }));
        });
    }
}