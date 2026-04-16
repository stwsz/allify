export async function getUser(email: string) {
	try {
		const response = await fetch('/api/mongodb/get-user', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email })
		});

		return await response.json();
	} catch (error) {
		return undefined;
	}
}
