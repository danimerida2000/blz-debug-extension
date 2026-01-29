/**
 * Floating debug monitor button component
 */

import { COLORS, DIMENSIONS, SHIELD_ICON_SVG, DOM_IDS } from '../constants';

/**
 * Creates or retrieves the monitor button element
 * @returns The monitor button element
 */
export function createMonitorButton(): HTMLElement {
    let button = document.getElementById(DOM_IDS.MONITOR_CONTAINER);

    if (!button) {
        button = document.createElement('section');
        button.id = DOM_IDS.MONITOR_CONTAINER;

        Object.assign(button.style, {
            width: `${DIMENSIONS.BUTTON_SIZE}px`,
            height: `${DIMENSIONS.BUTTON_SIZE}px`,
            borderRadius: DIMENSIONS.BUTTON_RADIUS,
            position: 'fixed',
            bottom: `${DIMENSIONS.EDGE_OFFSET}px`,
            right: `${DIMENSIONS.EDGE_OFFSET}px`,
            cursor: 'pointer',
            boxShadow: '0px 2px 5px #666',
            background: SHIELD_ICON_SVG,
            backgroundColor: COLORS.INACTIVE,
            zIndex: '8999',
            transition: 'background-color 0.2s ease-in-out',
        });

        document.body.appendChild(button);
    }

    return button;
}

/**
 * Updates the monitor button state appearance
 * @param button - The button element
 * @param isActive - Whether debug mode is active
 */
export function updateButtonState(button: HTMLElement, isActive: boolean): void {
    button.style.backgroundColor = isActive ? COLORS.ACTIVE : COLORS.INACTIVE;
}
