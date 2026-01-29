/**
 * Background Service Worker
 *
 * Handles extension lifecycle events and message passing
 * between popup and content scripts.
 */

import browser, { type Runtime } from 'webextension-polyfill';

/**
 * Message types for communication
 */
export interface DebugToggleMessage {
    type: 'TOGGLE_DEBUG';
    enabled: boolean;
}

export interface TabQueryMessage {
    type: 'QUERY_STATUS';
}

export type ExtensionMessage = DebugToggleMessage | TabQueryMessage;

/**
 * Log extension initialization
 */
console.log('[BlzDebug] Background service worker initialized');

/**
 * Handle extension installation
 */
browser.runtime.onInstalled.addListener((details: Runtime.OnInstalledDetailsType) => {
    console.log('[BlzDebug] Extension installed:', details.reason);
});

/**
 * Handle messages from popup or content scripts
 */
browser.runtime.onMessage.addListener(
    (
        message: ExtensionMessage,
        _sender: Runtime.MessageSender,
        sendResponse: (response: unknown) => void
    ) => {
        console.log('[BlzDebug] Received message:', message);

        // Future: implement message handling for popup ↔ content script communication
        // For now, just acknowledge the message
        sendResponse({ success: true });

        return true; // Keep channel open for async response
    }
);
