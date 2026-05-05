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
	if (!email || !mostListenedTracks || !mostListenedArtists) return undefined;

	const userInfoValue = get(userInfo);

	if (!userInfoValue?.email || !userInfoValue?.tickets) {
		throw new Error('User email or tickets are undefined');
	}

	const ticketUsed = await useTicket(userInfoValue.email, userInfoValue.tickets);

	if (ticketUsed.error) {
		throw new Error('Failed to use ticket');
	}

	const discoveriesRequest = await fetch('/api/ai/discoveries', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ mostListenedTracks, mostListenedArtists })
	});

	if (!discoveriesRequest.ok) {
		throw new Error(`Failed to fetch discoveries: ${discoveriesRequest.status}`);
	}

	const discoveriesRes = await discoveriesRequest.json();

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

		userInfo.update((current) => {
			if (!current?.email) return current;
			return {
				...current,
				discoveries: {
					...updateRes.discoveries,
					updatedAt: updateRes.discoveries.updatedAt
				},
				tickets: ticketUsed.tickets
			};
		});

		return { loaded: true };
	} catch {
		return { error: true, loaded: true };
	}
}
