import { ErrorStatus, Language } from '../../types';
import { parseLanguageField } from './common';

const defaultErrorStatus = ErrorStatus.BadRequest;

export const parseGenresRequest = (body: unknown): Language => {
    if (!body || typeof body !== "object" || !("language" in body) || !body.language) {
        return Language.English;
    }

    return parseLanguageField(body.language, defaultErrorStatus);
};