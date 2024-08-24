export class ComicLink extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        // Create the link element
        const link = document.createElement('a');
        link.href = this.getAttribute('href') || '#';
        link.className = 'cool-link';

        // Create the text element
        const text = document.createElement('h1');
        text.className = 'link-text';
        text.textContent = this.getAttribute('text') || '';

        // Append the text to the link
        link.appendChild(text);

        // Append the link to the shadow DOM
        shadow.appendChild(link);

        // Apply styles
        const style = document.createElement('style');
        style.textContent = `
            :host {
                width: 100%;
                height: 100%;
                display: block;
            }

            .cool-link {
                display: flex;
                align-items: center;
                justify-content: center;
                text-decoration: none;
                background-image: url('${this.getAttribute('background-image')}');
                background-size: cover;
                background-position: center;
                width: 100%;
                height: 100%;
                color: white;
                font-family: 'Orbitron', sans-serif;
                position: relative;
                overflow: hidden;

                border-radius: 10px;
                clip-path: polygon(0 0, 90% 0, 100% 100%, 10% 100%);
            }

            /* Subtle CRT-style border animation */
            .cool-link::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                border: 2px solid transparent;
                border-radius: 10px;
                box-sizing: border-box;
                pointer-events: none;
                background: linear-gradient(90deg, transparent, rgba(3, 233, 244, 0.3), transparent);
                background-size: 400% 400%;
                animation: border-glow 4s linear infinite;
                opacity: 0.6;
            }

            @keyframes border-glow {
                0% {
                    background-position: 0% 0%;
                }
                25% {
                    background-position: 100% 0%;
                }
                50% {
                    background-position: 100% 100%;
                }
                75% {
                    background-position: 0% 100%;
                }
                100% {
                    background-position: 0% 0%;
                }
            }

            .link-text {
                margin: 0;
                padding: 0;
                text-align: center;
                text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7); 
                position: relative;
            }
        `;
        shadow.appendChild(style);
    }
}
