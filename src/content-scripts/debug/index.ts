/**
 * Debug Content Script Entry Point
 *
 * This is the main entry for the content script that gets injected
 * into all pages. It initializes the Blazed Path context monitor.
 */

import './types';
import { initContextMonitor } from './blz-context-monitor';

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContextMonitor);
} else {
    // DOM already loaded
    initContextMonitor();
}
