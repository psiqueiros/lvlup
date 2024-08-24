export class CRTmonitor extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.activePanel = null;
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    position: fixed;
                    top: 0;
                    left: 0;
                    height: 100vh;
                    width: 100vw;
                    padding: 0;

                    display: flex;
                    overflow-y: auto;
                    scroll-snap-type: y mandatory;
                    flex-direction: column;


                    background-color: #131313;
                    animation: turn-on 0.4s;
                    box-shadow: inset 0 0 10vw 2vw rgba(15, 247, 255, 0.2);
                }

                :host::-webkit-scrollbar {
                    display: none;
                }

                :host::before {
                    content: "";
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(
                        to bottom,
                        rgba(18, 16, 16, 0) 50%,
                        rgba(0, 0, 0, 0.25) 50%
                    );
                    background-size: 100% 4px;
                    z-index: 2;
                    pointer-events: none;
                    animation: flicker 0.15s infinite;
                }

                :host::after {
                    content: "";
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(18, 16, 16, 0.1);
                    opacity: 0;
                    z-index: 2;
                    pointer-events: none;
                    animation: flicker 0.15s infinite;
                }

                @keyframes turn-on {
                    0% {
                        transform: scale(1, 0.8) translate3d(0, 0, 0);
                        filter: brightness(30);
                        opacity: 1;
                    }
                    100% {
                        transform: scale(1, 1) translate3d(0, 0, 0);
                        filter: brightness(1);
                        opacity: 1;
                    }
                }

                @keyframes flicker {
                    0% { opacity: 0.27861; }
                    5% { opacity: 0.34769; }
                    10% { opacity: 0.23604; }
                    15% { opacity: 0.90626; }
                    20% { opacity: 0.18128; }
                    25% { opacity: 0.83891; }
                    30% { opacity: 0.65583; }
                    35% { opacity: 0.67807; }
                    40% { opacity: 0.26559; }
                    45% { opacity: 0.84693; }
                    50% { opacity: 0.96019; }
                    55% { opacity: 0.08594; }
                    60% { opacity: 0.20313; }
                    65% { opacity: 0.71988; }
                    70% { opacity: 0.53455; }
                    75% { opacity: 0.37288; }
                    80% { opacity: 0.71428; }
                    85% { opacity: 0.70419; }
                    90% { opacity: 0.7003; }
                    95% { opacity: 0.36108; }
                    100% { opacity: 0.24387; }
                }
            </style>


            <slot></slot>
        `;

        this.setupIntersectionObserver();
        this.setupResizeObserver();
    }

    setupIntersectionObserver() {
        const options = {
            root: this,
            threshold: 0.5 // Consider a panel active when it's 50% visible
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.setActivePanel(entry.target);
                }
            });
        }, options);

        // Convert HTMLCollection to Array before using forEach
        Array.from(this.children).forEach(panel => observer.observe(panel));
    }

    setupResizeObserver() {
        const resizeObserver = new ResizeObserver(() => {
            this.updateActivePanelOnResize();
        });
        resizeObserver.observe(this);
    }

    updateActivePanelOnResize() {
        const centerX = this.scrollLeft + this.clientWidth / 2;
        const panels = Array.from(this.children);
        const centeredPanel = panels.find(panel => {
            const rect = panel.getBoundingClientRect();
            return rect.left <= centerX && rect.right >= centerX;
        });

        if (centeredPanel) {
            this.setActivePanel(centeredPanel);
        }
    }

    setActivePanel(panel) {
        if (this.activePanel !== panel) {
            if (this.activePanel) {
                this.activePanel.removeAttribute('active');
            }
            this.activePanel = panel;
            this.activePanel.setAttribute('active', '');
            this.dispatchEvent(new CustomEvent('active-panel-changed', { detail: { panel: this.activePanel } }));
        }
    }

    getActivePanel() {
        return this.activePanel;
    }
}

export class CRTpanel extends HTMLElement {
    connectedCallback() {
        if (!this.shadowRoot) {
            this.attachShadow({ mode: 'open' });
            this.shadowRoot.innerHTML = `
                <slot></slot>
            `;
        }
    }
}