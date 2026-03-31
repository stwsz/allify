export async function getUser(email: string) {
	const getUserFromMongoDB = await fetch('/api/mongodb/get-user', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ email })
	});

	const resJson = await getUserFromMongoDB.json();

	if (resJson.success === true) {
		return resJson;
	} else {
		console.error(resJson.error || 'Failed to fetch user');
	}
}
