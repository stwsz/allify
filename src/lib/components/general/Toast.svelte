<script lang="ts">
	// Stores
	import { toast } from '$lib/stores/toast.store';
	import { translationsStore } from '$lib/stores/translations.store';

	// Assets
	import WarningIcon from '$lib/assets/images/icons/signals/WarningIcon.svelte';
	import SuccessIcon from '$lib/assets/images/icons/signals/SuccessIcon.svelte';
	import ErrorIcon from '$lib/assets/images/icons/signals/ErrorIcon.svelte';
	import CloseIcon from '$lib/assets/images/icons/CloseIcon.svelte';

	let timeout: ReturnType<typeof setTimeout>;

	const closeToast = () => {
		toast.set({
			showToast: false,
			toastType: undefined,
			toastMessage: undefined
		});
	};

	$: if ($toast.showToast) {
		clearTimeout(timeout);

		timeout = setTimeout(() => {
			closeToast();
		}, 3500);
	}
</script>

{#if $toast.showToast}
	<div
		class={`animate-in fade-in slide-in-from-top-2 fixed top-2 right-2 z-50 flex w-11/12 
	max-w-sm items-start gap-4 rounded-xl 
	border bg-s-default p-4 shadow-lg transition-all 
	duration-300 sm:top-6 sm:right-6 sm:left-auto sm:max-w-md md:max-w-lg
	${
		$toast.toastType === 'success'
			? 'border-status-success/30'
			: $toast.toastType === 'warning'
				? 'border-status-warning/30'
				: $toast.toastType === 'error'
					? 'border-status-error/30'
					: ''
	}`}
	>
		<div class="mt-0.5 shrink-0">
			{#if $toast.toastType === 'warning'}
				<WarningIcon
					iconSvgClass="text-status-warning w-6 h-6"
					iconAltText={$translationsStore.generalTexts.toastWarningAltText}
				/>
			{:else if $toast.toastType === 'success'}
				<SuccessIcon
					iconSvgClass="text-status-success w-6 h-6"
					iconAltText={$translationsStore.generalTexts.toastSuccessAltText}
				/>
			{:else if $toast.toastType === 'error'}
				<ErrorIcon
					iconSvgClass="text-status-error w-6 h-6"
					iconAltText={$translationsStore.generalTexts.toastErrorAltText}
				/>
			{/if}
		</div>

		<div class="flex-1">
			<p class="text-s-default-foreground text-xs font-semibold sm:text-sm">
				{#if $toast.toastType === 'warning'}
					{$translationsStore.generalTexts.toastWarningTitle}
				{:else if $toast.toastType === 'success'}
					{$translationsStore.generalTexts.toastSuccessTitle}
				{:else if $toast.toastType === 'error'}
					{$translationsStore.generalTexts.toastErrorTitle}
				{/if}
			</p>

			<p class="text-s-muted-foreground mt-1 text-[11px] leading-relaxed sm:text-xs">
				{$toast.toastMessage}
			</p>
		</div>

		<button
			class="shrink-0 cursor-pointer"
			on:click={closeToast}
			aria-label={$translationsStore.generalTexts.toastCloseButtonAriaLabel}
		>
			<CloseIcon
				iconAltText={$translationsStore.generalTexts.toastCloseButtonAltText}
				iconSvgClass="w-4.5 h-4.5 text-t-primary"
			/>
		</button>
	</div>
{/if}
