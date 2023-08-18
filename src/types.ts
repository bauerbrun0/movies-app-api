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
    overview: string;
    voteAverage: number | null;
    popularity: number;
    posterPath: string;
    backdropPath: string | null;
    mediaType: MediaType;
}

export interface MediaItem extends BaseMediaItem {
    logo: string | null;
    tagLine: string | null;
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

export enum ErrorStatus {
    BadRequest = 400,
    InternalServerError = 500,
}