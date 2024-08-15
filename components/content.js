export class Content extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
                img {
                  display: block;
                  max-width: 100%;
                  max-height: 75vh;
                  object-fit: contain;
                  filter: drop-shadow(0 0 5px var(--glow-color));
                }
            </style>
            <div></div>
        `;
        this.contentElement = this.shadowRoot.querySelector('div');

        // Initialize content if provided
        const contentSrc = this.getAttribute('src');
        const contentType = this.getAttribute('type');
        if (contentSrc && contentType) {
            this.setContent(contentSrc, contentType);
        }
    }

    setContent(source, type) {
        if (this.contentElement) { // Ensure contentElement is defined
            this.contentElement.innerHTML = '';
            switch (type) {
                case 'image':
                    this.contentElement.innerHTML = `<img src="${source}" alt="Content">`;
                    break;
                case 'video':
                    this.contentElement.innerHTML = `<video src="${source}" controls></video>`;
                    break;
                default:
                    console.error('Unsupported content type');
            }
        } else {
            console.error('Content element is not defined.');
        }
    }
}
