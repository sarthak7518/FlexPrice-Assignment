import { describe, it, expect } from 'vitest';
import { createQueryConfig, REALTIME, DEFAULT, STATIC, getGlobalDefaults } from './createQueryConfig';

describe('createQueryConfig', () => {
	it('returns global defaults when called without overrides', () => {
		const config = createQueryConfig();
		expect(config.staleTime).toBe(5 * 60 * 1000);
		expect(config.gcTime).toBe(10 * 60 * 1000);
		expect(config.refetchOnWindowFocus).toBe(true);
		expect(config.retry).toBe(3);
	});

	it('allows overriding staleTime', () => {
		const config = createQueryConfig({ staleTime: 0 });
		expect(config.staleTime).toBe(0);
		expect(config.gcTime).toBe(10 * 60 * 1000); // unchanged
	});

	it('allows overriding gcTime', () => {
		const config = createQueryConfig({ gcTime: 60000 });
		expect(config.gcTime).toBe(60000);
		expect(config.staleTime).toBe(5 * 60 * 1000); // unchanged
	});

	it('allows overriding multiple values', () => {
		const config = createQueryConfig({ staleTime: 0, gcTime: 1000, retry: false });
		expect(config.staleTime).toBe(0);
		expect(config.gcTime).toBe(1000);
		expect(config.retry).toBe(false);
	});

	it('can accept a full preset as overrides', () => {
		const config = createQueryConfig(REALTIME);
		expect(config.staleTime).toBe(0);
		expect(config.gcTime).toBe(5 * 60 * 1000);
	});
});

describe('presets', () => {
	it('REALTIME has staleTime of 0', () => {
		expect(REALTIME.staleTime).toBe(0);
		expect(REALTIME.refetchOnWindowFocus).toBe(true);
	});

	it('DEFAULT has staleTime of 5 minutes', () => {
		expect(DEFAULT.staleTime).toBe(5 * 60 * 1000);
		expect(DEFAULT.gcTime).toBe(10 * 60 * 1000);
	});

	it('STATIC has staleTime of 30 minutes', () => {
		expect(STATIC.staleTime).toBe(30 * 60 * 1000);
		expect(STATIC.gcTime).toBe(60 * 60 * 1000);
		expect(STATIC.refetchOnWindowFocus).toBe(false);
	});

	it('all presets have required fields', () => {
		for (const preset of [REALTIME, DEFAULT, STATIC]) {
			expect(preset).toHaveProperty('staleTime');
			expect(preset).toHaveProperty('gcTime');
			expect(typeof preset.staleTime).toBe('number');
			expect(typeof preset.gcTime).toBe('number');
		}
	});

	it('REALTIME staleTime < DEFAULT staleTime < STATIC staleTime', () => {
		expect(REALTIME.staleTime).toBeLessThan(DEFAULT.staleTime);
		expect(DEFAULT.staleTime).toBeLessThan(STATIC.staleTime);
	});
});

describe('getGlobalDefaults', () => {
	it('returns a copy of the global defaults', () => {
		const defaults = getGlobalDefaults();
		expect(defaults.staleTime).toBe(5 * 60 * 1000);
		expect(defaults.gcTime).toBe(10 * 60 * 1000);
	});

	it('returns a new object each time (not a reference)', () => {
		const a = getGlobalDefaults();
		const b = getGlobalDefaults();
		expect(a).not.toBe(b);
		expect(a).toEqual(b);
	});
});
