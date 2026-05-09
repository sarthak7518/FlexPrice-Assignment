/**
 * Configurable TanStack Query caching utility for FlexPrice.
 *
 * Provides a `createQueryConfig` factory and pre-defined caching presets
 * so that every query in the app has consistent, declarative caching
 * behaviour.  Individual call sites can override defaults when needed
 * (e.g. real-time data pages use `staleTime: 0`).
 *
 * @module createQueryConfig
 */

/** Query caching configuration */
export interface QueryCacheConfig {
	/** Time in ms before data is considered stale (triggers background refetch) */
	staleTime: number;
	/** Time in ms before inactive cache entries are garbage-collected */
	gcTime: number;
	/** Whether to refetch when the window regains focus */
	refetchOnWindowFocus?: boolean;
	/** Whether to retry failed queries */
	retry?: boolean | number;
}

// ── Global defaults ─────────────────────────────────────────────────

const GLOBAL_DEFAULTS: QueryCacheConfig = {
	staleTime: 5 * 60 * 1000, // 5 minutes
	gcTime: 10 * 60 * 1000, // 10 minutes
	refetchOnWindowFocus: true,
	retry: 3,
};

// ── Pre-defined presets ─────────────────────────────────────────────

/**
 * REALTIME preset — for data that must always be fresh.
 *
 * Use for: live dashboards, active subscription status, wallet balances.
 */
export const REALTIME: QueryCacheConfig = {
	staleTime: 0,
	gcTime: 5 * 60 * 1000,
	refetchOnWindowFocus: true,
	retry: 1,
};

/**
 * DEFAULT preset — balanced caching for most API calls.
 *
 * Use for: customer lists, invoice lists, event logs.
 */
export const DEFAULT: QueryCacheConfig = {
	staleTime: 5 * 60 * 1000,
	gcTime: 10 * 60 * 1000,
	refetchOnWindowFocus: true,
	retry: 3,
};

/**
 * STATIC preset — for data that rarely changes.
 *
 * Use for: plan definitions, feature catalogues, currency lists.
 */
export const STATIC: QueryCacheConfig = {
	staleTime: 30 * 60 * 1000, // 30 minutes
	gcTime: 60 * 60 * 1000, // 1 hour
	refetchOnWindowFocus: false,
	retry: 2,
};

// ── Factory ─────────────────────────────────────────────────────────

/**
 * Create a query configuration by merging overrides into the global defaults.
 *
 * @param overrides - Partial config to merge on top of defaults
 * @returns A complete query cache config
 *
 * @example
 * ```ts
 * // Use defaults
 * useQuery({ queryKey: ['customers'], ...createQueryConfig() });
 *
 * // Real-time override
 * useQuery({ queryKey: ['walletBalance'], ...createQueryConfig({ staleTime: 0 }) });
 *
 * // Use a preset
 * useQuery({ queryKey: ['plans'], ...createQueryConfig(STATIC) });
 * ```
 */
export function createQueryConfig(overrides: Partial<QueryCacheConfig> = {}): QueryCacheConfig {
	return {
		...GLOBAL_DEFAULTS,
		...overrides,
	};
}

/**
 * Get the global default config (useful for QueryClient initialisation).
 */
export function getGlobalDefaults(): QueryCacheConfig {
	return { ...GLOBAL_DEFAULTS };
}
