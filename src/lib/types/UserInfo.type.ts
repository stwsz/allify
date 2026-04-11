export type UserInfo = {
	email: string;
	tickets: number;
	discoveries: {
		updatedAt: string;
		tracks: string[];
		artists: string[];
	};
	connectedStreamings: {
		spotify?: UserInfoSpotify | undefined;
		deezer?: undefined;
	};
};

export type UserInfoSpotify = {
	connected: boolean;
	name: string;
	email: string;
	images: { url: string; height: number | null; width: number | null }[];
	country: string;
	followers: number;
	profileLink: string;
	mostListenedArtists:
		| {
				limit: number;
				updatedAt: string;
				mostListenedArtistItem: ArtistSpotify;
				mostListenedArtistsItems: ArtistSpotify[];
		  }
		| undefined;
	mostListenedTracks:
		| {
				limit: number;
				updatedAt: string;
				mostListenedTrackItem: TrackSpotify;
				mostListenedTracksItems: TrackSpotify[];
		  }
		| undefined;
	likedTracks:
		| {
				limit: number;
				updatedAt: string;
				likedTracksItems: LikedTrackSpotify[];
		  }
		| undefined;
	playlists:
		| {
				updatedAt: string;
				playlistItems: PlaylistSpotify[];
		  }
		| undefined;
};

export type ArtistSpotify = {
	id: string;
	name: string;
	popularity: number;
	followers: number;
	genres: string[];
	images: { url: string; height: number | null; width: number | null }[];
	artistLink: string;
};

export type TrackSpotify = {
	id: string;
	name: string;
	artists: string[];
	popularity: number;
	albumName: string;
	images: { url: string; height: number | null; width: number | null }[];
	trackLink: string;
};

export type LikedTrackSpotify = {
	addedAt: string;
	name: string;
	artists: string[];
	popularity: number;
	album: {
		name: string;
		images: { url: string; height: number | null; width: number | null }[];
	};
	explicit: boolean;
	releaseDate: string;
	durationMs: number;
	trackLink: string;
};

export type PlaylistSpotify = {
	name: string;
	images: { url: string; height: number | null; width: number | null }[];
	owner: string;
	public: boolean;
	description?: string;
	playlistLink: string;
	tracks: {
		total: number;
		items:
			| {
					addedAt: string;
					name: string;
					explicit: boolean;
					artists: string[];
					durationMs: number;
					addedBy: string | undefined;
					images: { url: string; height: number | null; width: number | null }[];
					trackLink: string;
			  }[]
			| undefined;
	};
};
