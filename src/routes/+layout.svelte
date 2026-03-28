<script lang="ts">
	// Svelte
	import { onMount } from 'svelte';

	// Global styles
	import '$lib/styles/global.css';

	// Components
	import Header from '$lib/components/general/header/Header.svelte';
	import Footer from '$lib/components/general/footer/Footer.svelte';
	import LoadingAfterConnection from '$lib/components/general/LoadingAfterConnection.svelte';

	// Stores
	import { meStore } from '$lib/stores/me.store';
	import { loadingAfterConnectionStore } from '$lib/stores/loadingAfterConnection.store';

	let { children } = $props();

	const fetchMeInfo = async () => {
		try {
			const response = await fetch('/api/spotify/me', {
				credentials: 'include'
			});

			const data = await response.json();

			if (data.error) {
				meStore.set(undefined);
				return;
			}

			const spotifyData = {
				email: data.email,
				display_name: data.display_name,
				country: data.country,
				images: data.images,
				external_urls: data.external_urls,
				followers: data.followers,
				type: data.type,
				href: data.href
			};

			meStore.set({ ...spotifyData, connectedStreamings: { spotify: true, deezer: false } });
		} catch {
			meStore.set(undefined);
		}
	};

	onMount(() => {
		if (!$meStore) fetchMeInfo();
	});
</script>

<svelte:head>
	<!-- General -->
	<meta name="color-scheme" content="light" />
	<meta name="theme-color" content="#09623a" />
	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Allify" />
	<meta property="og:image" content="https://allify-sv.netlify.app/open-graph-images/og-image-allify.webp" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@allifyapp" />
	<meta name="twitter:image" content="https://allify-sv.netlify.app/open-graph-images/og-image-allify.webp" />
</svelte:head>

<Header />

<main id="main-content">
	{@render children()}
</main>

<Footer />

<LoadingAfterConnection
	loading={$loadingAfterConnectionStore.loading}
	streamingPlatform={$loadingAfterConnectionStore.streamingPlatform}
/>
