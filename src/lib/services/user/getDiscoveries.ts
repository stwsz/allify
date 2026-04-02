// Stores
import { userInfo } from '$lib/stores/userInfo.store';

export async function getDiscoveries(
	mostListenedTracks: string[],
	mostListenedArtists: string[],
	email: string
) {
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
		return { ...current, discoveries: updateRes.discoveries };
	});

	return { loaded: true };
}
