<script lang="ts">
	// Components
	import ProfileIcon from '$lib/assets/images/icons/ProfileIcon.svelte';
	import HeaderProfileItems from '$lib/components/general/header/HeaderProfileItems.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';
	import { meStore } from '$lib/stores/me.store';

	// Props
	export let showProfileOptions: boolean;
	export let openLanguageDropdown: boolean;

	$: loggedIn = $meStore ? true : false;
</script>

<button
	class="
		group
		flex
		h-10.5
		w-10.5
		cursor-pointer
		items-center
		justify-center
		rounded-full
		border-b-default
		bg-s-default
		shadow-sm
		ring-1
		ring-b-default
		transition
		duration-200
		ease-out
		hover:bg-s-muted
		hover:shadow-md
		hover:ring-brand-primary
		active:scale-95
	"
	aria-haspopup="menu"
	aria-expanded={showProfileOptions}
	on:click={() => {
		openLanguageDropdown = false;
		showProfileOptions = !showProfileOptions;
	}}
>
	{#if loggedIn}
		{#if $meStore?.images[0]}
			<img
				class={`
					h-${$meStore?.images[0]?.height}
					w-${$meStore?.images[0]?.width}
					rounded-full
					border
					object-cover
					p-1
					text-brand-primary
				`}
				src={$meStore?.images[0]?.url}
				alt={$meStore?.display_name}
			/>
		{:else}
			<div
				class="
					flex
					h-9/12
					w-9/12
					items-center
					justify-center
					rounded-full
					border
					object-cover
					p-1
					font-medium
					text-brand-primary
					pt-1
				"
				aria-label={$meStore?.display_name}
			>
				{$meStore?.display_name.slice(0, 1)}
			</div>
		{/if}
	{:else}
		<ProfileIcon
			iconSvgClass="
				block
				h-9
				w-9
				text-brand-primary
				transition-colors
				duration-200
				group-hover:text-brand-primary-dark
			"
			iconAltText={$translationsStore.generalTexts.profileNotLoggedAltText}
			color="currentColor"
		/>
	{/if}
</button>

<HeaderProfileItems bind:loggedIn bind:showProfileOptions />
