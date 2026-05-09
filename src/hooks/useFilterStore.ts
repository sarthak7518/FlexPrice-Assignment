/**
 * Filter persistence hook using Zustand — Challenge A.
 *
 * Persists multi-dimensional filter state for each page in `sessionStorage`
 * keyed by route (e.g. `filters:invoices`, `filters:customers`).
 * Syncs only a shallow fingerprint (filter count) to the URL so the page
 * remains bookmarkable without bloating the query string.
 *
 * @module useFilterStore
 */

import { create } from 'zustand';

// ── Types ───────────────────────────────────────────────────────────

export type FilterValue = string | number | boolean | string[] | null;

export interface FilterState {
	[key: string]: FilterValue;
}

interface FilterStoreState {
	/** All filters indexed by route key */
	filtersByRoute: Record<string, FilterState>;

	/** Set a single filter value for the current route */
	setFilter: (routeKey: string, key: string, value: FilterValue) => void;

	/** Set multiple filters at once */
	setFilters: (routeKey: string, filters: Partial<FilterState>) => void;

	/** Reset all filters for a route */
	resetFilters: (routeKey: string) => void;

	/** Get all filters for a route */
	getFilters: (routeKey: string) => FilterState;

	/** Get a fingerprint (count of active filters) for URL sync */
	getFingerprint: (routeKey: string) => number;
}

// ── Session storage helpers ─────────────────────────────────────────

function saveToSession(routeKey: string, filters: FilterState): void {
	try {
		sessionStorage.setItem(`filters:${routeKey}`, JSON.stringify(filters));
	} catch {
		// silently ignore quota errors
	}
}

function loadFromSession(routeKey: string): FilterState | null {
	try {
		const raw = sessionStorage.getItem(`filters:${routeKey}`);
		return raw ? (JSON.parse(raw) as FilterState) : null;
	} catch {
		return null;
	}
}

function clearSession(routeKey: string): void {
	try {
		sessionStorage.removeItem(`filters:${routeKey}`);
	} catch {
		// ignore
	}
}

// ── Fingerprint ─────────────────────────────────────────────────────

function computeFingerprint(filters: FilterState): number {
	return Object.values(filters).filter((v) => {
		if (v === null || v === undefined || v === '') return false;
		if (Array.isArray(v) && v.length === 0) return false;
		return true;
	}).length;
}

// ── Store ───────────────────────────────────────────────────────────

export const useFilterStore = create<FilterStoreState>((set, get) => ({
	filtersByRoute: {},

	setFilter: (routeKey, key, value) => {
		set((state) => {
			const currentFilters = state.filtersByRoute[routeKey] ?? loadFromSession(routeKey) ?? {};
			const updated = { ...currentFilters, [key]: value };
			saveToSession(routeKey, updated);
			return {
				filtersByRoute: {
					...state.filtersByRoute,
					[routeKey]: updated,
				},
			};
		});
	},

	setFilters: (routeKey, filters) => {
		set((state) => {
			const currentFilters = state.filtersByRoute[routeKey] ?? loadFromSession(routeKey) ?? {};
			const updated = { ...currentFilters, ...filters };
			saveToSession(routeKey, updated);
			return {
				filtersByRoute: {
					...state.filtersByRoute,
					[routeKey]: updated,
				},
			};
		});
	},

	resetFilters: (routeKey) => {
		clearSession(routeKey);
		set((state) => ({
			filtersByRoute: {
				...state.filtersByRoute,
				[routeKey]: {},
			},
		}));
	},

	getFilters: (routeKey) => {
		const state = get();
		return state.filtersByRoute[routeKey] ?? loadFromSession(routeKey) ?? {};
	},

	getFingerprint: (routeKey) => {
		const filters = get().getFilters(routeKey);
		return computeFingerprint(filters);
	},
}));

/**
 * Sync the fingerprint to the URL search params.
 * Call this in a useEffect to keep the URL in sync.
 */
export function syncFingerprintToUrl(routeKey: string, fingerprint: number): void {
	const url = new URL(window.location.href);
	if (fingerprint > 0) {
		url.searchParams.set('fc', String(fingerprint));
	} else {
		url.searchParams.delete('fc');
	}
	window.history.replaceState({}, '', url.toString());
}
