export class Character extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.expressions = [];
        this.currentExpression = 0;
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
                img, video {
                max-width: 100%;
                max-height: 100%;
                object-fit: contain;
                }
            </style>
            <img>
        `;
        this.img = this.shadowRoot.querySelector('img');

        // Initialize expressions if provided
        const expressionsAttr = this.getAttribute('expressions');
        if (expressionsAttr) {
            const expressionsList = expressionsAttr.split(',').map(expr => expr.trim());
            this.setExpressions(expressionsList);
        }
    }

    setExpressions(expressions) {
        this.expressions = expressions;
        this.currentExpression = 0;
        this.updateExpression();
    }

    nextExpression() {
        this.currentExpression = (this.currentExpression + 1) % this.expressions.length;
        this.updateExpression();
    }

    updateExpression() {
        if (this.img) { // Ensure img element is defined
            if (this.expressions.length > 0) {
                this.img.src = this.expressions[this.currentExpression];
            }
        } else {
            console.error('Image element is not defined.');
        }
    }
}
