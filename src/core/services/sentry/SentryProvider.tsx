// src/SentryProvider.tsx
import React from 'react';
import * as Sentry from '@sentry/react';

interface Props {
	children: React.ReactNode;
}
const sentryDsn = import.meta.env.VITE_APP_PUBLIC_SENTRY_DSN;
const isProd = import.meta.env.VITE_APP_ENVIRONMENT === 'prod' && Boolean(sentryDsn);

if (isProd) {
	Sentry.init({
		dsn: sentryDsn,
		integrations: [Sentry.browserTracingIntegration()],
		tracesSampleRate: 1.0,
		replaysSessionSampleRate: 0,
		replaysOnErrorSampleRate: 0,
	});
}

const SentryProvider = ({ children }: Props) => {
	return <Sentry.ErrorBoundary fallback={<div>Something went wrong</div>}>{children}</Sentry.ErrorBoundary>;
};

export default SentryProvider;
