export class CRTmonitor extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.activePanel = null;
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
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