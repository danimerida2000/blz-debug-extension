/**
 * Style and color constants for the debug overlay
 */

export const COLORS = {
    /** Inactive state - debug mode off */
    INACTIVE: '#ec1d1d',
    /** Active state - debug mode on */
    ACTIVE: '#66bb6a',
    /** Green for enabled switch */
    SWITCH_ENABLED: '#6ee774',

    // JSON syntax highlighting
    JSON_NUMBER: '#ee422e',
    JSON_KEY: '#1A1A1A',
    JSON_STRING: '#006000',
    JSON_BOOLEAN: '#ff8c00',
    JSON_NULL: '#004ed0',
} as const;

export const DIMENSIONS = {
    /** Floating button size in pixels */
    BUTTON_SIZE: 55,
    /** Button border radius for circular shape */
    BUTTON_RADIUS: '50%',
    /** Offset from screen edge */
    EDGE_OFFSET: 30,
    /** Context panel min width */
    PANEL_MIN_WIDTH: 250,
    /** Context panel max width */
    PANEL_MAX_WIDTH: 500,
    /** Context panel max height */
    PANEL_MAX_HEIGHT: 400,
} as const;

export const Z_INDEX = {
    /** Monitor button z-index */
    BUTTON: 8999,
    /** Context panel z-index */
    PANEL: 9000,
} as const;

/**
 * SVG icon for the debug shield button
 */
export const SHIELD_ICON_SVG = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path d="M12,3.19l7,3.11V11c0,4.52-2.98,8.69-7,9.93C7.98,19.69,5,15.52,5,11V6.3L12,3.19 M12,1L3,5v6c0,5.55,3.84,10.74,9,12 c5.16-1.26,9-6.45,9-12V5L12,1L12,1z M11,7h2v2h-2V7z M11,11h2v6h-2V11z"/></g></svg>')`;

/**
 * Prefixes for DOM element IDs
 */
export const DOM_IDS = {
    MONITOR_CONTAINER: 'blz-context-monitor',
    CONTEXT_PANEL: 'blz-monitor-context',
    COMPONENT_LABEL_PREFIX: 'blz-monitor-cmp-',
} as const;
