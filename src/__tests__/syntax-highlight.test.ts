/**
 * Unit tests for JSON syntax highlighting utility
 */

import { describe, it, expect } from 'vitest';
import { highlightJson, safeStringify } from '../content-scripts/debug/utils/syntax-highlight';

describe('highlightJson', () => {
    it('should wrap string values in green spans', () => {
        const result = highlightJson('"hello"');
        expect(result).toContain('color:#006000');
        expect(result).toContain('hello');
    });

    it('should wrap number values in red spans', () => {
        const result = highlightJson('42');
        expect(result).toContain('color:#ee422e');
        expect(result).toContain('42');
    });

    it('should wrap boolean values in orange spans', () => {
        const result = highlightJson('true');
        expect(result).toContain('color:#ff8c00');
        expect(result).toContain('true');
    });

    it('should wrap null in blue spans', () => {
        const result = highlightJson('null');
        expect(result).toContain('color:#004ed0');
        expect(result).toContain('null');
    });

    it('should wrap keys in black spans', () => {
        const result = highlightJson('"name": "value"');
        expect(result).toContain('color:#1A1A1A');
        expect(result).toContain('color:#006000');
    });

    it('should escape HTML characters', () => {
        const result = highlightJson('"<script>"');
        expect(result).toContain('&lt;script&gt;');
        expect(result).not.toContain('<script>');
    });
});

describe('safeStringify', () => {
    it('should stringify simple objects', () => {
        const result = safeStringify({ name: 'test' });
        expect(result).toContain('"name"');
        expect(result).toContain('"test"');
    });

    it('should format with indentation', () => {
        const result = safeStringify({ a: 1, b: 2 }, 2);
        expect(result).toContain('\n');
        expect(result).toContain('  ');
    });

    it('should handle circular references gracefully', () => {
        const obj: Record<string, unknown> = { name: 'test' };
        obj.self = obj;
        const result = safeStringify(obj);
        expect(result).toContain('Error serializing object');
    });

    it('should handle null and undefined', () => {
        expect(safeStringify(null)).toBe('null');
        expect(safeStringify(undefined)).toBe(undefined);
    });

    it('should stringify arrays', () => {
        const result = safeStringify([1, 2, 3]);
        expect(result).toContain('[');
        expect(result).toContain('1');
    });
});
