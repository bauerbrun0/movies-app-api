import { ErrorStatus, Logo } from '../../types';
import { ParsingError } from '../errors';
import { isArray } from '../typeguards';
import { parseStringField } from './common';

const defaultErrorStatus = ErrorStatus.InternalServerError;

export const parseLogosResponse = (body: unknown): Logo[] => {
    if (!body || typeof body !== "object" || !("logos" in body) || typeof body.logos !== "object") {
        throw new ParsingError("Missing or incorrect LogosResponse", defaultErrorStatus);
    }

    if (!isArray(body.logos)) {
        throw new ParsingError("Field 'logos' is not an array.", defaultErrorStatus);
    }

    if (!body.logos) {
        return [];
    }

    return body.logos.map(parseLogo);
};

const parseLogo = (logo: unknown): Logo => {
    if (!logo || typeof logo !== "object") {
        throw new ParsingError("Missing or incorrect Logos", defaultErrorStatus);
    }

    if (!("file_path" in logo)) {
        throw new ParsingError("Missing field 'logoPath'", defaultErrorStatus);
    }

    if (!("iso_639_1" in logo)) {
        throw new ParsingError("Missing field 'language'", defaultErrorStatus);
    }

    return {
        logoPath: parseStringField("logoPath", logo.file_path, defaultErrorStatus),
        language: logo.iso_639_1 ? parseStringField("language", logo.iso_639_1, defaultErrorStatus) : null
    };
};