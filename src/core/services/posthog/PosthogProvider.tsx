// src/PosthogProvider.tsx
import React, { ReactNode } from 'react';
import { PostHogProvider } from 'posthog-js/react';
import posthog from 'posthog-js';
import PosthogErrorBoundary from './PosthogErrorBoundary';
interface Props {
	children: ReactNode;
}

const posthogApiKey = import.meta.env.VITE_APP_PUBLIC_POSTHOG_KEY;
const posthogHost = import.meta.env.VITE_APP_PUBLIC_POSTHOG_HOST;
const isProd = import.meta.env.VITE_APP_ENVIRONMENT === 'prod' && Boolean(posthogApiKey) && Boolean(posthogHost);

if (isProd) {
	posthog.init(posthogApiKey, {
		api_host: posthogHost,
		capture_pageview: true,
	});

	// Safely start session recording
	posthog.sessionRecording?.startIfEnabledOrStop();
}

const PosthogWrapper: React.FC<Props> = ({ children }) => {
	if (isProd) {
		return (
			<PostHogProvider client={posthog}>
				<PosthogErrorBoundary>{children}</PosthogErrorBoundary>
			</PostHogProvider>
		);
	}
	return <>{children}</>;
};

export default PosthogWrapper;
