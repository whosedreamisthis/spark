'use client';

import { useEffect } from 'react';
import { updateLastActive } from '@/app/actions/userActions';

export default function PresenceTracker() {
	useEffect(() => {
		// 1. Update immediately when the app loads
		updateLastActive();

		// 2. Update every 4 minutes (since our 'Online' logic checks for 5 mins)
		const interval = setInterval(() => {
			updateLastActive();
		}, 1000 * 60 * 4);

		return () => clearInterval(interval);
	}, []);

	return null;
}
