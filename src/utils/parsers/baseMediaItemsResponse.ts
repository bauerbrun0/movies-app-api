import tmdbConfig from '../../config/tmdb.config';
import { BaseMediaItem, BaseMediaItemsResponse, ErrorStatus, MediaType } from '../../types';
import { ParsingError } from '../errors';
import { isArray } from '../typeguards';
import { parseIntegerField, parseMediaType, parseNumberField, parseStringField } from './common';

const defaultErrorStatus = ErrorStatus.InternalServerError;

export const parseBaseMediaItemsResponse = (body: unknown, defaultMediaType: MediaType | null): BaseMediaItemsResponse => {
    if (!body || typeof body !== "object") {
        throw new ParsingError("Missing or incorrect BaseMediaItemsResponse", defaultErrorStatus);
    }

    if (!("page" in body)) {
        throw new ParsingError("Missing field 'page'", defaultErrorStatus);
    }
    if (!("total_pages" in body)) {
        throw new ParsingError("Missing field 'totalPages'", defaultErrorStatus);
    }

    const page = parseIntegerField("page", body.page, defaultErrorStatus);
    const totalPages = parseIntegerField("totalPages", body.total_pages, defaultErrorStatus);

    if (!("results" in body) || typeof body.results !== "object") {
        throw new ParsingError("Missing or incorrect field 'mediaItems'", defaultErrorStatus);
    }

    const mediaItems = parseMediaItems(body.results, defaultMediaType);

    return {
        page,
        mediaItems,
        totalPages: Math.min(totalPages, tmdbConfig.maxPages)
    };
};

const parseMediaItems = (mediaItems: unknown, defaultMediaType: MediaType | null): BaseMediaItem[] => {
    if (!isArray(mediaItems)) {
        throw new ParsingError("Field 'mediaItems' is not an array", defaultErrorStatus);
    }

    return mediaItems.map(mediaItem => parseMediaItem(mediaItem, defaultMediaType));
};

const parseMediaItem = (mediaItem: unknown, defaultMediaType: MediaType | null): BaseMediaItem => {
    if (!mediaItem || typeof mediaItem !== "object") {
        throw new ParsingError("Missing or incorrect BaseMediaItem", defaultErrorStatus);
    }

    const { 
        id, title, releaseDate, mediaType, overview, voteAverage, popularity, posterPath, backdropPath
    } = getFields(mediaItem);

    
    return {
        id: parseIntegerField("id", id, defaultErrorStatus),
        mediaType: parseMediaType(mediaType, defaultMediaType, defaultErrorStatus),
        title: parseStringField("title", title, defaultErrorStatus),
        releaseDate: parseStringField("releaseDate", releaseDate, defaultErrorStatus),
        overview: overview ? parseStringField("overview", overview, defaultErrorStatus) : null,
        voteAverage: voteAverage !== null ? parseNumberField("voteAverage", voteAverage, defaultErrorStatus) : null,
        popularity: popularity !== null ? parseNumberField("popularity", popularity, defaultErrorStatus) : null,
        posterPath: posterPath ? parseStringField("posterPath", posterPath, defaultErrorStatus) : null,
        backdropPath: backdropPath ? parseStringField("backdropPath", backdropPath, defaultErrorStatus) : null
    };
};

const getFields = (mediaItem: object): { 
    id: unknown;
    title: unknown;
    releaseDate: unknown;
    overview: unknown;
    voteAverage: unknown;
    popularity: unknown;
    posterPath: unknown;
    backdropPath: unknown;
    mediaType: unknown;
} => {
    if (!("id" in mediaItem)) {
        throw new ParsingError("Missing field 'id'", defaultErrorStatus);
    }
    if (!("overview" in mediaItem)) {
        throw new ParsingError("Missing field 'overview'", defaultErrorStatus);
    }
    if (!("vote_average" in mediaItem)) {
        throw new ParsingError("Missing field 'voteAverage'", defaultErrorStatus);
    }
    if (!("popularity" in mediaItem)) {
        throw new ParsingError("Missing field 'popularity'", defaultErrorStatus);
    }
    if (!("poster_path" in mediaItem)) {
        throw new ParsingError("Missing field 'posterPath'", defaultErrorStatus);
    }
    if (!("backdrop_path" in mediaItem)) {
        throw new ParsingError("Missing field 'backdropPath'", defaultErrorStatus);
    }
        
    // title and releaseDate may have different property name based on the mediaType
    if (!("title" in mediaItem) && !("name" in mediaItem)) {
        throw new ParsingError("Missing field 'title'", defaultErrorStatus);
    }
    const title = "title" in mediaItem ? mediaItem.title : mediaItem.name;

    if (!("release_date" in mediaItem) && !("first_air_date" in mediaItem)) {
        throw new ParsingError("Missing field 'releaseDate'", defaultErrorStatus);
    }    
    const releaseDate = "release_date" in mediaItem ? mediaItem.release_date : mediaItem.first_air_date;

    // mediaType is rarely in the response
    const mediaType = "media_type" in mediaItem ? mediaItem.media_type : null;


    return {
        id: mediaItem.id,
        title,
        releaseDate,
        overview: mediaItem.overview,
        voteAverage: mediaItem.vote_average,
        popularity: mediaItem.popularity,
        posterPath: mediaItem.poster_path,
        backdropPath: mediaItem.backdrop_path,
        mediaType
    };
};

