/**
 * Blazed Path Context Monitor - Main orchestrator
 *
 * Provides an overlay for debugging Blazed Path applications by:
 * - Showing a floating button to toggle debug mode
 * - Highlighting components on hover
 * - Displaying component context data in a draggable panel
 */

import { createMonitorButton, updateButtonState } from './dom/monitor-button';
import { updateContextPanel, removeContextPanel } from './dom/context-panel';
import { highlightComponents, removeAllComponentLabels } from './dom/component-label';
import { findComponentInAncestors, isBlzAvailable } from './utils/component-finder';

/**
 * Debug monitor state
 */
interface MonitorState {
    isActive: boolean;
    mouseoverHandler: ((event: MouseEvent) => void) | null;
    keydownHandler: ((event: KeyboardEvent) => void) | null;
}

const state: MonitorState = {
    isActive: false,
    mouseoverHandler: null,
    keydownHandler: null,
};

/**
 * Handles mouseover events during debug mode
 */
function handleMouseover(event: MouseEvent): void {
    if (!state.isActive) return;

    const target = event.target as HTMLElement;
    const result = findComponentInAncestors(target);

    if (result) {
        highlightComponents(result.element);
        updateContextPanel(result.context);
    }
}

/**
 * Handles keyboard events (Escape to close)
 */
function handleKeydown(event: KeyboardEvent): void {
    const isEscape = event.key === 'Escape' || event.key === 'Esc' || event.keyCode === 27;

    if (isEscape && state.isActive) {
        deactivateDebugMode();
    }
}

/**
 * Activates debug mode
 */
function activateDebugMode(button: HTMLElement): void {
    state.isActive = true;
    updateButtonState(button, true);

    // Add event listeners
    state.mouseoverHandler = handleMouseover;
    state.keydownHandler = handleKeydown;

    document.addEventListener('mouseover', state.mouseoverHandler);
    document.addEventListener('keydown', state.keydownHandler);
}

/**
 * Deactivates debug mode
 */
function deactivateDebugMode(): void {
    state.isActive = false;

    const button = document.getElementById('blz-context-monitor');
    if (button) {
        updateButtonState(button, false);
    }

    // Remove event listeners
    if (state.mouseoverHandler) {
        document.removeEventListener('mouseover', state.mouseoverHandler);
        state.mouseoverHandler = null;
    }

    if (state.keydownHandler) {
        document.removeEventListener('keydown', state.keydownHandler);
        state.keydownHandler = null;
    }

    // Clean up UI elements
    removeAllComponentLabels();
    removeContextPanel();
}

/**
 * Toggles debug mode on/off
 */
function toggleDebugMode(button: HTMLElement): void {
    if (state.isActive) {
        deactivateDebugMode();
    } else {
        activateDebugMode(button);
    }
}

/**
 * Initializes the context monitor
 */
export function initContextMonitor(): void {
    if (!isBlzAvailable()) {
        console.debug('[BlzDebug] Blz object not found, skipping initialization');
        return;
    }

    console.debug('[BlzDebug] Initializing context monitor');

    const button = createMonitorButton();
    button.addEventListener('click', () => toggleDebugMode(button));
}

/**
 * Destroys the context monitor and cleans up
 */
export function destroyContextMonitor(): void {
    deactivateDebugMode();

    const button = document.getElementById('blz-context-monitor');
    if (button) {
        button.remove();
    }
}
