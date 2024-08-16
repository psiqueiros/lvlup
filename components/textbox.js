export class Textbox extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.sections = [];
        this.currentSection = 0;
        this.isAnimating = false;
        this.animationSpeed = 50; // milliseconds per character
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    color: white;
                    max-width: 100%; 
                    max-height: 100%;
                    object-fit: contain;
                }
                .text-content {
                    min-height: 1.2em;
                    white-space: pre-wrap;
                    word-wrap: break-word;
                }
                .text-content::after {
                    content: '';
                    display: inline-block;
                    width: 0.6em;
                    height: 1.2em;
                    background-color: #fff;
                    animation: blink 0.7s step-end infinite;
                    vertical-align: text-bottom;
                }
                @keyframes blink {
                    from, to { opacity: 1; }
                    50% { opacity: 0; }
                }
            </style>
            <div class="text-content"></div>
        `;
        this.textElement = this.shadowRoot.querySelector('.text-content');

        // Initialize text if provided
        const textContent = this.textContent.trim();
        if (textContent) {
            this.setText(textContent);
        }
    }

    setText(text) {
        this.sections = text.split('|').map(section => section.trim());
        this.currentSection = 0;
        this.updateText();
    }

    nextSection() {
        if (this.isAnimating) {
            // If animation is in progress, complete it immediately
            this.completeAnimation();
        } else {
            // Move to the next section
            this.currentSection = (this.currentSection + 1) % this.sections.length;
            this.updateText();
        }
    }

    updateText() {
        if (this.textElement) {
            if (this.sections.length > 0) {
                this.textElement.textContent = '';
                this.animateText(this.sections[this.currentSection]);
            }
        } else {
            console.error('Text element is not defined.');
        }
    }

    animateText(text) {
        this.isAnimating = true;
        let i = 0;
        const animate = () => {
            if (i < text.length) {
                this.textElement.textContent += text.charAt(i);
                i++;
                this.animationTimeout = setTimeout(animate, this.animationSpeed);
            } else {
                this.isAnimating = false;
            }
        };
        animate();
    }

    completeAnimation() {
        clearTimeout(this.animationTimeout);
        this.textElement.textContent = this.sections[this.currentSection];
        this.isAnimating = false;
    }
}