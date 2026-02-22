<script lang="ts">
	// Svelte
	import { page } from '$app/stores';
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
	import { translationsStore } from '$lib/stores/translations.store';

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

			meStore.set({ ...data, streaming: 'spotify' });
		} catch {
			meStore.set(undefined);
		}
	};

	onMount(() => {
		if (!$meStore) fetchMeInfo();
	});
</script>

<svelte:head>
	<link rel="canonical" href={`https://www.allify.com.br${$page.url.pathname}`} />
	<meta name="color-scheme" content="light" />
	<meta name="theme-color" content="#09623a" />
	<meta name="description" content={$translationsStore.configuration.metaDescriptionContent} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Allify" />
	<meta
		property="og:description"
		content={$translationsStore.configuration.metaOgAndTwitterContent}
	/>
	<meta property="og:url" content={`https://www.allify.com.br${$page.url.pathname}`} />
	<meta property="og:locale" content={$translationsStore.configuration.langAttribute} />
	<!-- <meta property="og:image" content="https://www.allify.com.br/og-image.png" /> -->
	<meta name="twitter:card" content="summary" />
	<meta
		name="twitter:description"
		content={$translationsStore.configuration.metaOgAndTwitterContent}
	/>
	<!-- <meta name="twitter:image" content="https://www.allify.com.br/og-image.png" /> -->
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
