/**
 * Component label overlay for highlighting Blz components
 */

import { DOM_IDS } from '../constants';

/**
 * Generates a random color for component borders
 */
function generateRandomColor(): string {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}

/**
 * Adds a label overlay to a component element
 * @param element - The component element
 * @param componentName - The name to display
 */
export function addComponentLabel(element: HTMLElement, componentName: string): void {
    const labelId = `${DOM_IDS.COMPONENT_LABEL_PREFIX}${componentName}`;
    let label = document.getElementById(labelId);

    if (!label) {
        label = document.createElement('span');
        label.id = labelId;
        element.prepend(label);
    }

    // Add dotted border with random color
    element.style.border = `2px dotted ${generateRandomColor()}`;

    label.textContent = componentName;
    Object.assign(label.style, {
        display: 'flex',
        justifyContent: 'center',
        fontWeight: 'bold',
        userSelect: 'all',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: '2px 8px',
        fontSize: '12px',
        borderRadius: '4px',
    });
}

/**
 * Highlights a component by traversing up the DOM tree
 * @param container - Starting container element
 */
export function highlightComponents(container: HTMLElement | null): void {
    if (!container) return;

    const component = container.querySelector('[data-cmp]') as HTMLElement | null;
    if (component?.dataset?.cmp) {
        addComponentLabel(component, component.dataset.cmp);

        // Continue up the tree
        if (component.parentElement) {
            highlightComponents(component.parentElement);
        }
    } else if (container.parentElement) {
        highlightComponents(container.parentElement);
    }
}

/**
 * Removes all component labels and borders
 */
export function removeAllComponentLabels(): void {
    document.querySelectorAll(`[id*='${DOM_IDS.COMPONENT_LABEL_PREFIX}']`).forEach((el) => {
        const parent = el.parentElement;
        if (parent) {
            parent.style.border = 'none';
        }
        el.remove();
    });
}
