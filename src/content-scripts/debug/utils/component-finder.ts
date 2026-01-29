/**
 * Utilities for finding and extracting context from Blazed Path components
 */

import type { BlzComponent, BlzContextData } from '../types';

/**
 * Checks if the Blz global is available
 */
export function isBlzAvailable(): boolean {
    return typeof Blz === 'object' && Blz !== null;
}

/**
 * Gets a Blazed Path component by its ID
 * @param id - The component ID
 * @returns The component or null if not found
 */
export function getComponent(id: string): BlzComponent | null {
    if (!isBlzAvailable()) return null;
    try {
        return Blz.ComponentManager.getComponent(id);
    } catch {
        return null;
    }
}

/**
 * Extracts the context data from a Blazed Path component
 * @param component - The component to extract context from
 * @returns The context data or null if not available
 */
export function extractContext(component: BlzComponent): BlzContextData | null {
    // Try data property first
    if (component.data && Object.keys(component.data).length > 0) {
        return component.data;
    }

    // Try model property
    if (component.model && Object.keys(component.model).length > 0) {
        // Check if model has getObj method
        if (typeof component.model.getObj === 'function') {
            try {
                return component.model.getObj();
            } catch {
                // Fall through to return model directly
            }
        }
        return component.model as BlzContextData;
    }

    // Try getSelected method
    if (typeof component.getSelected === 'function') {
        try {
            const selected = component.getSelected();
            if (selected?.data && Object.keys(selected.data).length > 0) {
                return selected.data as BlzContextData;
            }
            return selected;
        } catch {
            return null;
        }
    }

    return null;
}

/**
 * Finds the nearest parent element with a component ID
 * @param element - Starting element
 * @returns Object with element, component, and context, or null
 */
export function findComponentInAncestors(element: HTMLElement | null): {
    element: HTMLElement;
    component: BlzComponent;
    context: BlzContextData;
} | null {
    let current = element;

    while (current) {
        if (current.id) {
            const component = getComponent(current.id);
            if (component) {
                const context = extractContext(component);
                if (context) {
                    return { element: current, component, context };
                }
            }
        }
        current = current.parentElement;
    }

    return null;
}
