<script lang="ts">
	// Assets
	import CloseIcon from '$lib/assets/images/icons/CloseIcon.svelte';

	// Stores
	import { showAddTickets } from '$lib/stores/showAddTickets.store';

	let checkoutUrl: string | null = null;
	let quantity = 1;
	const options = [1, 5, 10, 25];

	async function handleCheckout() {
		try {
			const req = await fetch('/api/checkout/tickets/create-checkout', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					items: [{ id: 'prod_ypRnMCbTwsXBKRfZgF4xrQXK', quantity }],
					externalId: `allify_order_${crypto.randomUUID()}`,
					returnUrl: `${window.location.origin}`,
					completionUrl: `${window.location.origin}/checkout-tickets/success`,
					methods: ['PIX', 'CARD'],
					metadata: { origem: 'app-mobile' }
				})
			});

			if (!req.ok) {
				const errData = await req.json();
				throw new Error(errData?.error ?? `HTTP error ${req.status}`);
			}

			const data = await req.json();
			checkoutUrl = data?.data?.url ?? null;

			if (!checkoutUrl) throw new Error('Checkout URL not found in response');
			window.location.href = checkoutUrl;
		} catch (err: any) {
			console.error(err.message ?? 'An error occurred during checkout');
		}
	}
</script>

<div
	class="fixed inset-0 z-50 flex items-center justify-center bg-s-inverse/60 p-4 backdrop-blur-md"
>
	<div
		class="relative flex w-full max-w-md flex-col overflow-hidden rounded-2xl border border-b-default bg-s-default shadow-xl"
	>
		<div class="border-b border-b-default px-6 py-5">
			<button
				class="absolute top-5 right-5 z-10 cursor-pointer opacity-70 transition hover:scale-105 hover:opacity-100"
				on:click={() => showAddTickets.set(false)}
				aria-label="Fechar modal de tickets"
			>
				<CloseIcon
					iconAltText="Fechar modal de tickets"
					iconSvgClass="w-5 h-5 text-brand-primary"
				/>
			</button>

			<div class="flex flex-col gap-1.5 pr-8">
				<p class="text-xs font-medium tracking-widest text-t-secondary uppercase">Allify Tickets</p>
				<p class="text-xl font-bold text-t-primary">Adquirir tickets</p>
				<p class="text-sm leading-relaxed text-t-secondary">
					Parece que seus tickets acabaram. Adquira mais para continuar aproveitando os recursos.
				</p>
			</div>
		</div>

		<div class="flex flex-col gap-5 px-6 py-5">
			<div class="flex flex-col gap-3">
				<p class="text-xs font-medium tracking-widest text-t-secondary uppercase">Quantidade</p>

				<div class="grid grid-cols-4 gap-2">
					{#each options as opt}
						<button
							class="cursor-pointer rounded-xl border py-3 text-sm font-semibold transition
								{quantity === opt
								? 'border-brand-primary bg-brand-primary text-t-inverse'
								: 'border-b-default bg-s-muted text-t-primary hover:border-brand-primary hover:text-brand-primary'}"
							on:click={() => (quantity = opt)}
						>
							{opt}
						</button>
					{/each}

					<input
						type="number"
						min="1"
						placeholder="Escolha você mesmo"
						class="col-span-4 mt-1 rounded-xl border bg-s-muted px-4 py-3 text-sm font-semibold text-t-primary transition outline-none placeholder:text-t-muted
							{!options.includes(quantity)
							? 'border-brand-primary'
							: 'border-b-default focus:border-brand-primary'}"
						on:input={(e) => {
							const val = parseInt(e.currentTarget.value);
							if (!isNaN(val) && val >= 1) quantity = val;
						}}
					/>
				</div>
			</div>

			<div class="flex items-center gap-2">
				<span
					class="inline-flex shrink-0 items-center rounded-md bg-brand-primary px-3 py-1 text-[11px] font-medium text-t-inverse"
				>
					{quantity}
					{quantity === 1 ? 'ticket' : 'tickets'}
				</span>
				<span class="text-xs text-t-muted">•</span>
				<span class="text-xs text-t-secondary">
					selecionado{quantity === 1 ? '' : 's'}
				</span>
			</div>

			<button
				class="w-full cursor-pointer rounded-xl bg-brand-primary px-4 py-3 text-sm font-semibold text-t-inverse transition hover:opacity-90 active:scale-95"
				on:click={handleCheckout}
			>
				Ir para o checkout
			</button>
		</div>
	</div>
</div>
