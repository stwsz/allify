export type UserInfoSpotify = {
	connected: boolean;
	name: string;
	email: string;
	image: { url: string; height: number; width: number };
	country: string;
	followers: number;
	profileLink: string;
	mostListenedArtists: {
		limit: number;
		updatedAt: Date;
		mostListenedArtistItem: ArtistSpotify;
		mostListenedArtistsItems: ArtistSpotify[];
	};
	mostListenedTracks: {
		limit: number;
		updatedAt: Date;
		mostListenedTrackItem: TrackSpotify;
		mostListenedTracksItems: TrackSpotify[];
	};
	likedTracks: {
		limit: number;
		updatedAt: Date;
		likedTracksItems: LikedTrackSpotify[];
	};
	playlists: {
		updatedAt: Date;
		playlistItems: PlaylistSpotify[];
	};
	albums: {
		updatedAt: Date;
		albumItems: AlbumSpotify[];
	};
};

export type ArtistSpotify = {
	id: string;
	name: string;
	popularity: number;
	followers: number;
	genres: string[];
	image: { url: string; height: number; width: number };
	artistLink: string;
};

export type TrackSpotify = {
	id: string;
	name: string;
	artists: string[];
	popularity: number;
	albumName: string;
	image: { url: string; height: number; width: number };
	trackLink: string;
};

export type LikedTrackSpotify = {
	addedAt: string;
	name: string;
	artists: string[];
	popularity: number;
	album: {
		name: string;
		image: { url: string; height: number; width: number };
	};
	explicit: boolean;
	releaseDate: string;
	durationMs: number;
	trackLink: string;
};

export type PlaylistSpotify = {
	name: string;
	image: { url: string; height: number; width: number };
	owner: string;
	public: boolean;
	description?: string;
	playlistLink: string;
	tracks: {
		total: number;
		items: {
			addedAt: string;
			name: string;
			explicit: boolean;
			artists: string[];
			durationMs: number;
			addedBy: string;
			image: { url: string; height: number; width: number };
			trackLink: string;
		}[];
	};
};

export type AlbumSpotify = {
	addedAt: string;
	name: string;
	image: { url: string; height: number; width: number };
	releaseDate: string;
	artists: string[];
	albumLink: string;
	tracks: {
		total: number;
		items: {
			name: string;
			explicit: boolean;
			artists: string[];
			durationMs: number;
			trackNumber: number;
			trackLink: string;
		}[];
	};
};
