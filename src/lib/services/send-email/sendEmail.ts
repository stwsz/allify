export async function sendEmail(subject: string, email: string, message: string) {
	await fetch('/api/send-email', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			subject: subject,
			email: email,
			message: message
		})
	});
}
