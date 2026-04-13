// Svelte
import { get } from 'svelte/store';

// Stores
import { translationsStore } from '$lib/stores/translations.store';

// Types
import type { ArtistSpotify } from '$lib/types/UserInfo.type';

export async function getMostListenedArtists() {
	const getTranslationStore = get(translationsStore);

	let mostListenedArtistItem: ArtistSpotify;
	let mostListenedArtistsItems = [] as ArtistSpotify[];

	try {
		const reqMostListenedArtists = await fetch(`/api/spotify/most-listened-artists`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ locale: getTranslationStore.locale })
		});

		if (!reqMostListenedArtists.ok) return undefined;

		const resMostListenedArtists = await reqMostListenedArtists.json();

		mostListenedArtistItem = {
			id: resMostListenedArtists[0].id,
			name: resMostListenedArtists[0].name,
			popularity: resMostListenedArtists[0].popularity,
			followers: resMostListenedArtists[0].followers.total,
			genres: resMostListenedArtists[0].genres,
			images: resMostListenedArtists[0].images,
			artistLink: resMostListenedArtists[0].external_urls.spotify
		};

		for (let i = 0; i < resMostListenedArtists.length; i++) {
			mostListenedArtistsItems.push({
				id: resMostListenedArtists[i].id,
				name: resMostListenedArtists[i].name,
				popularity: resMostListenedArtists[i].popularity,
				followers: resMostListenedArtists[i].followers.total,
				genres: resMostListenedArtists[i].genres,
				images: resMostListenedArtists[i].images,
				artistLink: resMostListenedArtists[i].external_urls.spotify
			});
		}

		return {
			limit: 5,
			updatedAt: new Date().toLocaleDateString('en-US'),
			mostListenedArtistItem,
			mostListenedArtistsItems
		};
	} catch {
		return undefined;
	}
}
