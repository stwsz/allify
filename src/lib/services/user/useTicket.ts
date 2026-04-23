export async function useTicket(email: string, tickets: number) {
	const response = await fetch('/api/mongodb/use-ticket', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ email, tickets })
	});

	return response.json();
}
