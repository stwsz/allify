import type { RequestHandler } from '@sveltejs/kit';
import { ALLIFY_URL } from '$env/static/private';

export const GET: RequestHandler = async () => {
	const pages = ['/', '/my-musical-profile', '/discoveries', '/music-battles', 'profile'];

	const body = `<?xml version="1.0" encoding="UTF-8" ?>
	<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
		${pages
			.map(
				(page) => `
			<url>
				<loc>${ALLIFY_URL}${page}</loc>
				<changefreq>weekly</changefreq>
				<priority>0.8</priority>
			</url>
		`
			)
			.join('')}
	</urlset>`;

	return new Response(body, {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
};
