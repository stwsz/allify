<script lang="ts">
	// Stores
	import { translationsStore } from '$lib/stores/translations.store';
	import { onMount } from 'svelte';

	// Props
	export let topItemType: 'tracks' | 'artists' | 'albums';

	let loading = true;

	function getTopItemFromLocalStorage() {
		const topItems = localStorage.getItem(
			`mostListened${topItemType.charAt(0).toUpperCase() + topItemType.slice(1)}`
		);

		if (topItems) {
			return JSON.parse(topItems);
		}

		loading = false;

		return null;
	}

	onMount(() => {
		getTopItemFromLocalStorage();
	});
</script>

<div>
	<h3 class="font-medium text-t-inverse">
		{#if topItemType === 'tracks'}
			{$translationsStore.profilePage.profilePageUserTopTrack}
		{:else if topItemType === 'artists'}
			{$translationsStore.profilePage.profilePageUserTopArtist}
			<!-- {:else if topItemType === 'albums'}
            <h3>{$translationsStore.profilePage.topAlbums}</h3> -->
		{/if}
	</h3>

	<div></div>
</div>
