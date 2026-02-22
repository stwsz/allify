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
	<title>{$translationsStore.homePage.title}</title>
</svelte:head>

<HeroSection />
<ConnectPlatformsSection />
<DevicesSection />
