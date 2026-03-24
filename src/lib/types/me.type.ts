export type MeType = {
	connectedStreamings: {
		spotify: boolean;
		deezer: boolean;
	};
	display_name: string;
	email: string;
	country: string;
	external_urls: { spotify: string };
	followers: { href: string | null; total: number };
	images: { url: string; height: number | null; width: number | null }[];
	type: 'user';
	href: string;
};
