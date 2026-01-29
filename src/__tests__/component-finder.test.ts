/**
 * Unit tests for component finder utility
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
    isBlzAvailable,
    getComponent,
    extractContext,
} from '../content-scripts/debug/utils/component-finder';

describe('isBlzAvailable', () => {
    beforeEach(() => {
        // Reset Blz global
        vi.stubGlobal('Blz', undefined);
    });

    it('should return false when Blz is not defined', () => {
        expect(isBlzAvailable()).toBe(false);
    });

    it('should return true when Blz is an object', () => {
        vi.stubGlobal('Blz', { ComponentManager: { getComponent: vi.fn() } });
        expect(isBlzAvailable()).toBe(true);
    });

    it('should return false when Blz is null', () => {
        vi.stubGlobal('Blz', null);
        expect(isBlzAvailable()).toBe(false);
    });
});

describe('getComponent', () => {
    beforeEach(() => {
        vi.stubGlobal('Blz', undefined);
    });

    it('should return null when Blz is not available', () => {
        expect(getComponent('test-id')).toBeNull();
    });

    it('should call ComponentManager.getComponent', () => {
        const mockGetComponent = vi.fn().mockReturnValue({ id: 'test-id' });
        vi.stubGlobal('Blz', {
            ComponentManager: { getComponent: mockGetComponent },
        });

        const result = getComponent('test-id');
        expect(mockGetComponent).toHaveBeenCalledWith('test-id');
        expect(result).toEqual({ id: 'test-id' });
    });

    it('should return null on error', () => {
        vi.stubGlobal('Blz', {
            ComponentManager: {
                getComponent: () => {
                    throw new Error('Test error');
                },
            },
        });

        expect(getComponent('test-id')).toBeNull();
    });
});

describe('extractContext', () => {
    it('should extract data property', () => {
        const component = { data: { foo: 'bar' } };
        expect(extractContext(component)).toEqual({ foo: 'bar' });
    });

    it('should extract model property', () => {
        const component = { model: { name: 'test' } };
        expect(extractContext(component)).toEqual({ name: 'test' });
    });

    it('should call model.getObj() if available', () => {
        const component = {
            model: {
                getObj: () => ({ computed: 'value' }),
            },
        };
        expect(extractContext(component)).toEqual({ computed: 'value' });
    });

    it('should call getSelected() if available', () => {
        const component = {
            getSelected: () => ({ selected: true }),
        };
        expect(extractContext(component)).toEqual({ selected: true });
    });

    it('should return null for empty component', () => {
        expect(extractContext({})).toBeNull();
    });

    it('should prefer data over model', () => {
        const component = {
            data: { from: 'data' },
            model: { from: 'model' },
        };
        expect(extractContext(component)).toEqual({ from: 'data' });
    });
});
