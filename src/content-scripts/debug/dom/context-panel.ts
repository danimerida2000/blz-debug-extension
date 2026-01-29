/**
 * Context panel for displaying component data
 */

import { DIMENSIONS, DOM_IDS } from '../constants';
import { highlightJson, safeStringify } from '../utils/syntax-highlight';
import { initDragHandler } from '../utils/drag-handler';
import type { BlzContextData } from '../types';

/**
 * Creates or retrieves the context panel element
 * @returns The context panel element
 */
export function createContextPanel(): HTMLPreElement {
    let panel = document.getElementById(DOM_IDS.CONTEXT_PANEL) as HTMLPreElement | null;

    if (!panel) {
        panel = document.createElement('pre');
        panel.id = DOM_IDS.CONTEXT_PANEL;

        Object.assign(panel.style, {
            display: 'flex',
            flexFlow: 'column',
            minWidth: `${DIMENSIONS.PANEL_MIN_WIDTH}px`,
            maxWidth: `${DIMENSIONS.PANEL_MAX_WIDTH}px`,
            maxHeight: `${DIMENSIONS.PANEL_MAX_HEIGHT}px`,
            position: 'fixed',
            bottom: '85px',
            right: `${DIMENSIONS.EDGE_OFFSET}px`,
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.58)',
            wordBreak: 'break-all',
            backgroundColor: '#fcfcfc',
            borderRadius: '10px',
            padding: '10px',
            border: '1px dotted #404040',
            resize: 'both',
            overflow: 'hidden',
            zIndex: '9000',
        });
    }

    return panel;
}

/**
 * Creates the drag handle for the panel
 */
function createDragHandle(): HTMLAnchorElement {
    const handle = document.createElement('a');
    handle.textContent = 'Drag and Drop';

    Object.assign(handle.style, {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '10%',
        minHeight: '24px',
        fontWeight: '600',
        fontSize: '14px',
        borderBottom: '1px solid #757575',
        marginBottom: '8px',
        paddingBottom: '8px',
    });

    return handle;
}

/**
 * Creates the code block for displaying JSON
 */
function createCodeBlock(): HTMLElement {
    const code = document.createElement('code');

    Object.assign(code.style, {
        fontSize: '10pt',
        overflow: 'auto',
        flex: '1',
        margin: '0px 8px 10px 0px',
    });

    return code;
}

/**
 * Updates the context panel with new data
 * @param context - The context data to display
 */
export function updateContextPanel(context: BlzContextData): void {
    const panel = createContextPanel();

    // Clear existing content
    panel.innerHTML = '';

    // Create drag handle
    const handle = createDragHandle();
    panel.appendChild(handle);

    // Create code block with highlighted JSON
    const code = createCodeBlock();
    code.innerHTML = highlightJson(safeStringify(context));
    panel.appendChild(code);

    // Initialize drag handler
    initDragHandler(panel, handle);

    // Ensure panel is in the DOM
    if (!document.body.contains(panel)) {
        document.body.appendChild(panel);
    }

    // Adjust width if content is wider than viewport
    if (code.offsetWidth > window.innerWidth) {
        panel.style.width = `${window.innerWidth - 40}px`;
    }
}

/**
 * Removes the context panel from the DOM
 */
export function removeContextPanel(): void {
    const panel = document.getElementById(DOM_IDS.CONTEXT_PANEL);
    if (panel) {
        panel.remove();
    }
}
