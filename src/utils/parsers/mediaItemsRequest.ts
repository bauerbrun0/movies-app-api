import { ErrorStatus, Language, MediaItemsRequest, TimeWindow } from '../../types';
import { ParsingError } from '../errors';
import { isLanguage, isTimeWindow } from '../typeguards';
import { parseIntegerField, parseStringField } from './common';

const defaultErrorStatus = ErrorStatus.BadRequest;

export const parseMediaItemsRequest = (body: unknown, pageUpperBound: number): MediaItemsRequest => {
    const defaultRequest = {
        page: 1,
        timeWindow: TimeWindow.Day,
        language: Language.English
    };

    if (!body || typeof body !== "object") {
        return defaultRequest;
    }

    return {
        page: "page" in body ? parsePage(body.page, pageUpperBound) : defaultRequest.page,
        timeWindow: "timeWindow" in body ? parseTimeWindow(body.timeWindow) : defaultRequest.timeWindow,
        language: "language" in body ? parseLanguage(body.language) : defaultRequest.language
    };
};

const parsePage = (page: unknown, upperBound: number): number => {
    const pg = parseIntegerField("page", page, defaultErrorStatus);

    if (pg < 1 || pg > upperBound) {
        throw new ParsingError(`Field 'page' is out of range (1 - ${upperBound})`, defaultErrorStatus);
    }

    return pg;
};

const parseTimeWindow = (timeWindow: unknown): TimeWindow => {
    const tw = parseStringField("timeWindow", timeWindow, defaultErrorStatus);
    if (!isTimeWindow(tw)) {
        throw new ParsingError("Field 'timeWindow' is not a valid TimeWindow", defaultErrorStatus);
    }

    return tw;
};

const parseLanguage = (language: unknown): Language => {
    const lang = parseStringField("language", language, defaultErrorStatus);
    if (!isLanguage(lang)) {
        throw new ParsingError("Field 'timeWindow' is not a valid Language", defaultErrorStatus);
    }

    return lang;
};
