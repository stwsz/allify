export async function getUser(email: string) {
	try {
		const getUserRequest = await fetch('/api/mongodb/get-user', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email })
		});

		return await getUserRequest.json();
	} catch (error) {
		return undefined;
	}
}
