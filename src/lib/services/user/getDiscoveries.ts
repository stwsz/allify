// Svelte
import { get } from 'svelte/store';

// Services
import { useTicket } from './useTicket';

// Stores
import { userInfo } from '$lib/stores/userInfo.store';

export async function getDiscoveries(
	mostListenedTracks: string[],
	mostListenedArtists: string[],
	email: string
) {
	const userInfoValue = get(userInfo);

	const discoveriesReq = await fetch('/api/ai/discoveries', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ mostListenedTracks, mostListenedArtists })
	});

	if (!discoveriesReq.ok) {
		throw new Error(`Failed to fetch discoveries: ${discoveriesReq.status}`);
	}

	const discoveriesRes = await discoveriesReq.json();

	const { tracks, artists } = discoveriesRes;

	try {
		const updateReq = await fetch('/api/mongodb/update-discoveries', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, tracks, artists })
		});

		if (!updateReq.ok) {
			throw new Error(`Failed to update discoveries: ${updateReq.status}`);
		}

		const updateRes = await updateReq.json();

		if (!userInfoValue?.email || !userInfoValue?.tickets) {
			throw new Error('User email or tickets are undefined');
		}

		const ticketUsed = await useTicket(userInfoValue.email, userInfoValue.tickets);

		userInfo.update((current) => {
			if (!current?.email) return current;
			return { ...current, discoveries: updateRes.discoveries, tickets: ticketUsed.tickets };
		});
	} catch {
		return { error: true, loaded: true };
	}

	return { loaded: true };
}
