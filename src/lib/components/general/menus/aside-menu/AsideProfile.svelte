<script lang="ts">
	// Assets
	import ProfileIcon from '$lib/assets/images/icons/ProfileIcon.svelte';
	import ArrowIcon from '$lib/assets/images/icons/ArrowIcon.svelte';

	// Components
	import AsideProfileItems from '$lib/components/general/menus/aside-menu/AsideProfileItems.svelte';

	// Utils
	import { logout } from '$lib/utils/logout';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';
	import { meStore } from '$lib/stores/me.store';

	$: loggedIn = $meStore ? true : false;
	let showProfileOptions: boolean = false;
</script>

<div class="mt-auto border-t border-b-muted/10 px-4 py-4 sm:px-5 sm:py-5">
	<div
		class="
			rounded-xl
			border
			border-b-muted/10
			bg-s-default/95
			shadow-sm
			backdrop-blur-md
			transition-all
			duration-200
			hover:shadow-md
		"
	>
		<button
			class="
				group
				flex
				w-full
				cursor-pointer
				items-center
				gap-3
				px-3
				py-3
				transition-all
				duration-200
				ease-out
				active:scale-[0.98]
			"
			on:click={() => (showProfileOptions = !showProfileOptions)}
			aria-label="Toggle profile items"
		>
			{#if loggedIn}
				<img
					class="
						h-10
						w-10
						rounded-full
						border
						border-b-default
						object-cover
						sm:h-11
						sm:w-11
					"
					src={$meStore?.images[1]?.url}
					alt={$meStore?.display_name}
				/>

				<div class="min-w-0 flex-1 text-left">
					<p class="text-sm leading-tight font-semibold text-t-primary">
						{$meStore?.display_name}
					</p>
					<p class="mt-0.5 truncate text-xs text-t-muted">
						{$meStore?.email}
					</p>
				</div>
			{:else}
				<div
					class="
						flex
						h-10
						w-10
						items-center
						justify-center
						rounded-full
						bg-s-muted
						transition-colors
						duration-200
						group-hover:bg-s-muted/80
						sm:h-11
						sm:w-11
					"
				>
					<ProfileIcon
						iconSvgClass="h-7 w-7 text-brand-primary transition-colors duration-200 group-hover:text-brand-primary-dark"
						iconAltText={$translationsStore.generalTexts.profileNotLoggedAltText}
						color="currentColor"
					/>
				</div>

				<p class="flex-1 text-sm font-medium text-t-primary">
					{$translationsStore.generalTexts.cardProfileAsideMenuParagraph1}
				</p>
			{/if}

			<ArrowIcon
				iconSvgClass="
					h-5
					w-5
					text-t-muted
					transition-transform
					duration-200
					{showProfileOptions ? 'rotate-180' : ''}
				"
				iconAltText={$translationsStore.generalTexts.dropdownAriaLabel}
			/>
		</button>

		{#if showProfileOptions}
			<div class="px-3 pb-3">
				<div class="mb-3 h-px bg-b-muted/10"></div>

				<AsideProfileItems {loggedIn} />

				{#if loggedIn}
					<div class="my-3 h-px bg-b-muted/10"></div>

					<button
						class="
							w-full
							cursor-pointer
							rounded-lg
							bg-status-error
							px-3
							py-2
							text-sm
							font-semibold
							text-t-inverse
							transition-all
							duration-200
							hover:bg-status-error/80
						"
						on:click={async () => {
							await logout();

							showProfileOptions = false;
						}}
					>
						{$translationsStore.generalTexts.profileLoggedItem3}
					</button>
				{/if}
			</div>
		{/if}
	</div>
</div>
