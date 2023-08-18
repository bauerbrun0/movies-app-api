import { ErrorStatus } from '../../types';
import { ParsingError } from '../errors';
import { parseStringField } from './common';

const defaultErrorStatus = ErrorStatus.InternalServerError;

export const parseTaglineResponse = (body: unknown): string | null => {
    if (!body || typeof body !== "object" || !("tagline" in body)) {
        throw new ParsingError("Missing or incorrect TaglineResponse", defaultErrorStatus);
    }

    return body.tagline ? parseStringField("tagline", body.tagline, defaultErrorStatus) : null;
};