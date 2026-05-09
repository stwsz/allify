// Environment variables
import { ALLIFY_URL } from '$env/static/private';

export const GET = () => {
	return new Response(
		`User-agent: *
Allow: /

Sitemap: ${ALLIFY_URL}/sitemap.xml`,
		{
			headers: { 'Content-Type': 'text/plain' }
		}
	);
};
