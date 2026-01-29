/**
 * Type definitions for Blazed Path debug extension
 */

/**
 * Represents a Blazed Path component
 */
export interface BlzComponent {
    id?: string;
    data?: Record<string, unknown>;
    model?: BlzModel;
    getSelected?: () => BlzContextData | null;
}

/**
 * Blazed Path model with optional data getter
 */
export interface BlzModel {
    data?: Record<string, unknown>;
    getObj?: () => Record<string, unknown>;
    [key: string]: unknown;
}

/**
 * Context data extracted from a Blazed Path component
 */
export type BlzContextData = Record<string, unknown>;

/**
 * Component Manager for Blazed Path
 */
export interface BlzComponentManager {
    getComponent: (id: string) => BlzComponent | null;
}

/**
 * Global Blazed Path object
 */
export interface BlzGlobal {
    ComponentManager: BlzComponentManager;
}

/**
 * Extend the Window interface to include Blz
 */
declare global {
    interface Window {
        Blz?: BlzGlobal;
    }
    const Blz: BlzGlobal | undefined;
}

export { };
