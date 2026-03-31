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

		if (resJson.success === true) {
			return resJson;
		} else {
			return undefined;
		}
	} catch (error) {
		return undefined;
	}
}

