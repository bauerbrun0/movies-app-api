import { ErrorStatus, Genre } from '../../types';
import { ParsingError } from '../errors';
import { isArray } from '../typeguards';
import { parseIntegerField, parseStringField } from './common';

const defaultErrorStatus = ErrorStatus.InternalServerError;

export const parseGenresResponse = (body: unknown): Genre[] => {
    if (!body || typeof body !== "object" || !("genres" in body)) {
        throw new ParsingError("Missing or incorrect GenresResponse", defaultErrorStatus);
    }

    if (!isArray(body.genres)) {
        throw new ParsingError("Field 'genres' is not an array", defaultErrorStatus);
    }

    return body.genres.map(parseGenre);
};


const parseGenre = (genre: unknown): Genre => {
    if (!genre || typeof genre !== "object") {
        throw new ParsingError("Missing or incorrect Genre", defaultErrorStatus);
    }

    if (!("id" in genre)) {
        throw new ParsingError("Missing field 'id' in Genre", defaultErrorStatus);
    }

    if (!("name" in genre)) {
        throw new ParsingError("Missing field 'name' in Genre", defaultErrorStatus);
    }

    return {
        id: parseIntegerField("id", genre.id, defaultErrorStatus),
        name: parseStringField("name", genre.name, defaultErrorStatus)
    };
};