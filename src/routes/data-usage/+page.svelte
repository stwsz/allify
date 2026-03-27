<script lang="ts">
	// SVelte
	import { page } from '$app/stores';

	// Components
	import DataUsage from '$lib/components/legal-pages/DataUsage.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';
</script>

<svelte:head>
	<!-- General -->
	<title>{$translationsStore.legalPages.dataUsage.title}</title>
	<meta
		name="description"
		content={$translationsStore.legalPages.dataUsage.dataUsageMetaDescription}
	/>
	<link rel="canonical" href={`https://allify.app${$page.url.pathname}`} />
	<!-- Open Graph -->
	<meta property="og:locale" content={$translationsStore.configuration.langAttribute} />
	<meta property="og:url" content={`https://allify.app${$page.url.pathname}`} />
	<meta property="og:title" content={$translationsStore.legalPages.dataUsage.title} />
	<meta
		property="og:description"
		content={$translationsStore.legalPages.dataUsage.dataUsageMetaOgAndTwitterContent}
	/>
	<!-- Twitter Card -->
	<meta name="twitter:url" content={`https://allify.app${$page.url.pathname}`} />
	<meta name="twitter:title" content={$translationsStore.legalPages.dataUsage.title} />
	<meta
		name="twitter:description"
		content={$translationsStore.legalPages.dataUsage.dataUsageMetaOgAndTwitterContent}
	/>
</svelte:head>

<DataUsage />
