import { ErrorStatus, Language, MediaType } from '../../types';
import { ParsingError } from '../errors';
import { isLanguage, isMediaType, isNumber, isString } from '../typeguards';

export const parseNumberField = (fieldName: string, value: unknown, errorStatus: ErrorStatus): number => {
    if (value === null) {
        throw new ParsingError(`Field '${fieldName}' is null`, errorStatus);
    }
    
    if (!isNumber(value)) {
        throw new ParsingError(`Field '${fieldName}' is not a number`, errorStatus);
    }

    return value;
};

export const parseIntegerField = (fieldName: string, value: unknown, errorStatus: ErrorStatus): number => {
    const num = parseNumberField(fieldName, value, errorStatus);

    if (!Number.isInteger(num)) {
        throw new ParsingError(`Field '${fieldName}' is not an integer`, errorStatus);
    }

    return num;
};

export const parseStringField = (fieldName: string, value: unknown, errorStatus: ErrorStatus): string => {
    if (!value) {
        throw new ParsingError(`Field '${fieldName}' is null`, errorStatus);
    }

    if (!isString(value)) {
        throw new ParsingError(`Field '${fieldName}' is not a string`, errorStatus);
    }

    return value;
};

export const parseMediaType = (mediaType: unknown, defaultMediaType: MediaType | null, errorStatus: ErrorStatus): MediaType => {
    if (!mediaType && !defaultMediaType) {
        throw new ParsingError("Field 'mediaType' is null", errorStatus);
    }

    if (!mediaType && defaultMediaType) {
        return defaultMediaType;
    }
    
    if (!isString(mediaType)) {
        throw new ParsingError("Field 'mediaType' is not a string", errorStatus);
    }

    if (!isMediaType(mediaType)) {
        throw new ParsingError("Field 'mediaType' is not a valid MediaType", errorStatus);
    }

    return mediaType;
};

export const parseLanguageField = (language: unknown, errorStatus: ErrorStatus): Language => {
    const lang = parseStringField("language", language, errorStatus);
    if (!isLanguage(lang)) {
        throw new ParsingError("Field 'timeWindow' is not a valid Language", errorStatus);
    }

    return lang;
};

export const parseIntegerRequestParam = (paramName: string, value: string, errorStatus: ErrorStatus): number => {
    const num = Number.parseInt(value);

    if (!Number.isInteger(num)) {
        throw new ParsingError(`Request parameter '${paramName}' is not an integer`, errorStatus);
    }

    return num;
};