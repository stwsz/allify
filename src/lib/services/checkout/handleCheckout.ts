export async function handleCheckout(quantity: number) {
	try {
		const reqCreateCheckoutAbacatePay = await fetch('/api/checkout/tickets/create-checkout', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				items: [{ id: 'prod_ypRnMCbTwsXBKRfZgF4xrQXK', quantity }],
				externalId: `allify_order_${crypto.randomUUID()}`,
				returnUrl: `${window.location.href}`,
				completionUrl: `${window.location.href}`,
				methods: ['PIX', 'CARD'],
				metadata: { origem: 'app-mobile' }
			})
		});

		if (!reqCreateCheckoutAbacatePay.ok) {
			const errData = await reqCreateCheckoutAbacatePay.json();
			throw new Error(errData?.error ?? `HTTP error ${reqCreateCheckoutAbacatePay.status}`);
		}

		const data = await reqCreateCheckoutAbacatePay.json();
		const checkoutUrl = data?.data?.url ?? null;

		if (!checkoutUrl) throw new Error('Checkout URL not found in response');

		window.location.href = checkoutUrl;
	} catch (err: any) {
		console.error(err.message ?? 'An error occurred during checkout');
	}
}
