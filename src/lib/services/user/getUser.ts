export async function getUser(email: string) {
	try {
		const response = await fetch('/api/mongodb/get-user', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email })
		});

		const resJson = await response.json();

		console.log('[getUser] resJson:', resJson);

		if (resJson.success === true) {
			return resJson;
		} else {
			console.error('[API ERROR]:', resJson.error);
		}
	} catch (error) {
		console.error('[getUser]', error);
	}
}

