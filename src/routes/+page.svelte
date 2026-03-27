<script lang="ts">
	// Svelte
	import { page } from '$app/stores';

	// Components
	import HeroSection from '$lib/components/home-page/HeroSection.svelte';
	import ConnectPlatformsSection from '$lib/components/home-page/ConnectPlatformsSection.svelte';
	import DevicesSection from '$lib/components/home-page/DevicesSection.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';
</script>

<svelte:head>
	<!-- General -->
	<title>{$translationsStore.homePage.title}</title>
	<meta name="description" content={$translationsStore.homePage.homePageMetaDescription} />
	<link rel="canonical" href={`https://allify.app${$page.url.pathname}`} />
	<!-- Open Graph -->
	<meta property="og:locale" content={$translationsStore.configuration.langAttribute} />
	<meta property="og:url" content={`https://allify.app${$page.url.pathname}`} />
	<meta property="og:title" content={$translationsStore.homePage.title} />
	<meta
		property="og:description"
		content={$translationsStore.homePage.homePageMetaOgAndTwitterContent}
	/>
	<!-- Twitter Card -->
	<meta name="twitter:url" content={`https://allify.app${$page.url.pathname}`} />
	<meta name="twitter:title" content={$translationsStore.homePage.title} />
	<meta
		name="twitter:description"
		content={$translationsStore.homePage.homePageMetaOgAndTwitterContent}
	/>
</svelte:head>

<HeroSection />
<ConnectPlatformsSection />
<DevicesSection />
