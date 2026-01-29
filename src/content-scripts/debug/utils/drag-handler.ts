/**
 * Drag and drop handler for the context panel
 */

import { Z_INDEX } from '../constants';

/**
 * Makes an element draggable via a handle element
 * @param panel - The panel element to make draggable
 * @param handle - The drag handle element
 */
export function initDragHandler(panel: HTMLElement, handle: HTMLElement): void {
    handle.style.cursor = 'move';
    handle.style.userSelect = 'none';

    handle.addEventListener('mousedown', (event: MouseEvent) => {
        event.preventDefault();

        const rect = panel.getBoundingClientRect();
        const shiftX = event.clientX - rect.left;
        const shiftY = event.clientY - rect.top;

        const movePanel = (pageX: number, pageY: number): void => {
            panel.style.left = `${pageX - shiftX}px`;
            panel.style.top = `${pageY - shiftY}px`;
        };

        const onMouseMove = (moveEvent: MouseEvent): void => {
            movePanel(moveEvent.pageX, moveEvent.pageY);
        };

        // Position absolutely relative to body
        panel.style.position = 'absolute';
        panel.style.zIndex = String(Z_INDEX.PANEL);
        document.body.appendChild(panel);

        // Initial position at mouse location
        movePanel(event.pageX, event.pageY);

        document.addEventListener('mousemove', onMouseMove);

        const cleanup = (): void => {
            document.removeEventListener('mousemove', onMouseMove);
        };

        document.addEventListener('mouseup', cleanup, { once: true });
    });

    // Prevent default drag behavior
    handle.addEventListener('dragstart', (e) => e.preventDefault());
}
