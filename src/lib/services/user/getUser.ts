export async function getUser(email: string) {
	try {
		console.log('[FRONTEND] Sending request to /get-user');

		const response = await fetch('/api/mongodb/get-user', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email })
		});

		console.log('[RESPONSE STATUS]:', response.status);

		if (!response.ok) {
			const text = await response.text();
			console.error('[RAW ERROR RESPONSE]:', text);
			throw new Error('Request failed');
		}

		const resJson = await response.json();
		console.log('[RESPONSE JSON]:', resJson);

		if (resJson.success === true) {
			return resJson;
		} else {
			console.error('[API ERROR]:', resJson.error);
		}
	} catch (error) {
		console.error('[FRONTEND ERROR]:', error);
	}
}

