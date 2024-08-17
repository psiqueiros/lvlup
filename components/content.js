export class Content extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
            div {
                width: 100%;
                height: 100%;
                display: flex;
                flex-wrap: wrap;
                align-content: center;
                justify-content: center;
                overflow: hidden;
            }

            img, video {
                max-width: 90%;
                max-height: 90%;
                object-fit: contain;
                border: 5px solid #111; /* Dark border for the arcade cabinet */
                border-radius: 20px; /* Rounded corners */
                box-shadow: 
                    inset 0 0 5px #000, /* Inner shadow for depth */
                    0 0 15px #ff00ff, /* Neon glow */
                    0 0 30px #00ffff; /* Neon glow */
                animation: ledMotion 5s linear infinite; /* LED motion animation */
            }

            @keyframes ledMotion {
                0% {
                    box-shadow: 
                        0 0 10px #ff0000,
                        0 0 20px #ff0000,
                        0 0 30px #ff0000,
                        0 0 40px #ff0000;
                }
                25% {
                    box-shadow: 
                        0 0 10px #00ff00,
                        0 0 20px #00ff00,
                        0 0 30px #00ff00,
                        0 0 40px #00ff00;
                }
                50% {
                    box-shadow: 
                        0 0 10px #0000ff,
                        0 0 20px #0000ff,
                        0 0 30px #0000ff,
                        0 0 40px #0000ff;
                }
                75% {
                    box-shadow: 
                        0 0 10px #ff00ff,
                        0 0 20px #ff00ff,
                        0 0 30px #ff00ff,
                        0 0 40px #ff00ff;
                }
                100% {
                    box-shadow: 
                        0 0 10px #ff0000,
                        0 0 20px #ff0000,
                        0 0 30px #ff0000,
                        0 0 40px #ff0000;
                }
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
