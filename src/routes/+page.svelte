<script lang="ts">
	// Svelte
	import { page } from '$app/stores';

	// Components
	import HeroSection from '$lib/components/home-page/HeroSection.svelte';
	import ConnectPlatformsSection from '$lib/components/home-page/ConnectPlatformsSection.svelte';
	import DevicesSection from '$lib/components/home-page/DevicesSection.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Schema
	import { getSchemaInfo } from '$lib/utils/getSchemaInfo';

	const schema = getSchemaInfo('homePage');
	$: locale = $translationsStore.configuration.langAttribute as keyof typeof schema.description;

	$: jsonLd = {
		'@context': schema.context,
		'@type': schema.type,
		name: schema.name,
		url: schema.url,
		description: schema.description[locale] ?? schema.description['en'],
		applicationCategory: schema.applicationCategory,
		applicationSubCategory: schema.applicationSubCategory,
		operatingSystem: schema.operatingSystem,
		inLanguage: schema.inLanguage,
		featureList: schema.featureList[locale] ?? schema.featureList['en'],
		offers: schema.offers.map((o) => ({
			'@type': o.type,
			price: o.price,
			priceCurrency: o.priceCurrency,
			description: o.description[locale] ?? o.description['en']
		})),
		publisher: {
			'@type': schema.publisher.type,
			name: schema.publisher.name,
			url: schema.publisher.url
		}
	};
</script>

<svelte:head>
	<!-- Schema.org -->
	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}
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
