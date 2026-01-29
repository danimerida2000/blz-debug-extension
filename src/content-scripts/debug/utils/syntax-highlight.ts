/**
 * JSON syntax highlighter for displaying context data
 */

import { COLORS } from '../constants';

/**
 * Escapes HTML special characters
 */
function escapeHtml(str: string): string {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

/**
 * Determines the color for a JSON value based on its type
 */
function getColorForMatch(match: string): string {
    if (/^"/.test(match)) {
        // String - check if it's a key (ends with :)
        return /:$/.test(match) ? COLORS.JSON_KEY : COLORS.JSON_STRING;
    }
    if (/true|false/.test(match)) {
        return COLORS.JSON_BOOLEAN;
    }
    if (/null/.test(match)) {
        return COLORS.JSON_NULL;
    }
    // Number
    return COLORS.JSON_NUMBER;
}

/**
 * Regex pattern for matching JSON tokens
 * Matches: strings (with optional colon suffix), booleans, null, numbers
 */
const JSON_TOKEN_REGEX =
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g;

/**
 * Converts a JSON string to HTML with syntax highlighting
 * @param json - The JSON string to highlight
 * @returns HTML string with colored spans
 */
export function highlightJson(json: string): string {
    const escaped = escapeHtml(json);
    return escaped.replace(JSON_TOKEN_REGEX, (match) => {
        const color = getColorForMatch(match);
        return `<span style="color:${color};">${match}</span>`;
    });
}

/**
 * Safely stringify an object to JSON with formatting
 * @param obj - Object to stringify
 * @param indent - Number of spaces for indentation
 * @returns Formatted JSON string or error message
 */
export function safeStringify(obj: unknown, indent = 4): string {
    try {
        return JSON.stringify(obj, null, indent);
    } catch (error) {
        return `[Error serializing object: ${error instanceof Error ? error.message : 'Unknown error'}]`;
    }
}
