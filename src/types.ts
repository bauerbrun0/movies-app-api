// Request body from client
export interface MediaItemsRequest {
    page: number;
    language: Language;
    timeWindow: TimeWindow;
}

// Base/initial response body from TMDB api 'list' endpoints (eg. trending, popular, top-rated, etc.) 
export interface BaseMediaItemsResponse {
    page: number;
    totalPages: number;
    mediaItems: BaseMediaItem[];
}

// Response body to client
export interface MediaItemsResponse extends BaseMediaItemsResponse {
    mediaItems: MediaItem[];
} 

export interface BaseMediaItem {
    id: number;
    title: string;
    releaseDate: string;
    overview: string | null;
    voteAverage: number | null;
    popularity: number | null;
    posterPath: string | null;
    backdropPath: string | null;
    mediaType: MediaType;
}

export interface MediaItem extends BaseMediaItem {
    logoPath: string | null;
    tagline: string | null;
}

interface BaseDetailedMediaItem extends BaseMediaItem {
    genres: Genre[];
    homepage: string | null;
    originalLanguage: string;
    originalTitle: string;
    spokenLanguages: string[];
    status: string | null;
    voteCount: number | null;
    tagline: string | null;
}

export interface BaseDetailedMovie extends BaseDetailedMediaItem {
    imdbId: string;
    runtime: number | null;
    budget: number | null;
    revenue: number | null;
}

export interface DetailedMovie extends BaseDetailedMovie {
    logoPath: string | null;
    trailers: Video[];
    teasers: Video[];
    actors: Actor[];
    directors: CrewMember[];
    producers: CrewMember[];
}

export interface BaseDetailedTvShow extends BaseMediaItem {
    inProduction: boolean;
    creators: Creator[];
    episodeRuntimes: number[];
    numberOfEpisodes: number | null;
    numberOfSeasons: number | null;
    seasons: Season[];
}

export interface DetailedTvShow extends BaseDetailedTvShow {
    imdbId: string;
    logoPath: string | null;
    trailers: Video[];
    teasers: Video[];
    actors: Actor[];
}

export enum Language {
    English = "en-US",
    Hungarian = "hu-HU",
}

export enum TimeWindow {
    Day = "day",
    Week = "week",
}

export enum MediaType {
    Movie = 'movie',
    TvShow = 'tv',
}

export interface Genre {
    id: number;
    name: string;
}

export interface Season {
    id: number;
    airDate: string | null;
    episodeCount: number | null;
    name: string | null;
    seasonNumber: number;
}

export interface Video {
    name: string;
    youtubeLink: string;
}

// To paraphrase Quentin Tarantino:
// https://youtu.be/h3-va0umXTY?si=3ycJbLYKxulklL1_&t=178
export interface Actor {
    name: string;
    character: string;
    profilePath: string | null;
}

export interface CrewMember {
    name: string;
    profilePath: string | null;
    job: string;
}

export interface Creator {
    name: string;
    profilePath: string | null;
}

export enum ErrorStatus {
    BadRequest = 400,
    InternalServerError = 500,
}

export interface Logo {
    logoPath: string;
    language: string | null;
}
