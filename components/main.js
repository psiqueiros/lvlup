console.log("main.js is loaded");
import { RPGGUI, AButton } from './rpg-gui.js';
import { CRTmonitor, CRTpanel } from'./crt-monitor.js';
import { Character } from './character.js';
import { Textbox } from './textbox.js';
import { Content } from './content.js';

customElements.define('rpg-gui', RPGGUI);
customElements.define('a-button', AButton);
customElements.define('crt-monitor', CRTmonitor);
customElements.define('crt-panel', CRTpanel);
customElements.define('character-wc', Character);
customElements.define('textbox-wc', Textbox);
customElements.define('content-wc', Content);

document.addEventListener('DOMContentLoaded', () => {
    const aButton = document.querySelector('a-button');
    const crtMonitor = document.querySelector('crt-monitor');

    crtMonitor.addEventListener('active-panel-changed', (event) => {
        console.log('Active panel changed:', event.detail.panel);
    });

    aButton.addEventListener('a-button-press', () => {
        const activePanel = crtMonitor.getActivePanel();
        if (activePanel) {
            const textbox = activePanel.querySelector('textbox-wc');
            const character = activePanel.querySelector('character-wc');

            if (textbox) {
                textbox.nextSection();
            }

            if (character) {
                character.nextExpression();
            }
        }
    });
});