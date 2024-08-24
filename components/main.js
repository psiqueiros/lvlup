import { RPGGUI, AButton } from './rpg-gui.js';
import { CRTmonitor, CRTpanel } from './crt-monitor.js';
import { Character } from './character.js';
import { Textbox } from './textbox.js';
import { Content } from './content.js';
import { ComicLink } from './comic-link.js';

customElements.define('rpg-gui', RPGGUI);
customElements.define('a-button', AButton);
customElements.define('crt-monitor', CRTmonitor);
customElements.define('crt-panel', CRTpanel);
customElements.define('character-wc', Character);
customElements.define('textbox-wc', Textbox);
customElements.define('content-wc', Content);
customElements.define('comic-link', ComicLink);

document.addEventListener('DOMContentLoaded', () => {
    const aButton = document.querySelector('a-button');
    const crtMonitor = document.querySelector('crt-monitor');
    const rpgGui = document.querySelector('rpg-gui');

    crtMonitor.addEventListener('active-panel-changed', (event) => {
        console.log('Active panel changed:', event.detail.panel);
    });

    aButton.addEventListener('a-button-press', () => {
        const activePanel = crtMonitor.getActivePanel();
        if (activePanel) {
            const textbox = activePanel.querySelector('textbox-wc');
            const character = activePanel.querySelector('character-wc');

            if (textbox) {
                if (textbox.isAnimating) {
                    textbox.completeAnimation();
                } else {
                    textbox.nextSection();
                    if (character) {
                        character.nextExpression();
                    }
                }
            }
        }
    });

    rpgGui.addEventListener('panel-navigation', (event) => {
        const { direction } = event.detail;
        const currentPanel = crtMonitor.getActivePanel();
        const panels = Array.from(crtMonitor.children);
        const currentIndex = panels.indexOf(currentPanel);

        let nextIndex;
        if (direction === 'up') {
            nextIndex = (currentIndex - 1 + panels.length) % panels.length;
        } else {
            nextIndex = (currentIndex + 1) % panels.length;
        }

        panels[nextIndex].scrollIntoView({ behavior: 'smooth' });
    });
});