import { Language, MediaType, TimeWindow } from '../types';

export const isNumber = (param: unknown): param is number => {
    return typeof param === "number" || param instanceof Number;
};

export const isString = (param: unknown): param is string => {
    return typeof param === "string" || param instanceof String;
};

export const isArray = (param: unknown): param is unknown[] => {
    return Array.isArray(param);
};

export const isLanguage = (param: string): param is Language => {
    return Object.values(Language).map(v => v.toString()).includes(param);
};

export const isTimeWindow = (param: string): param is TimeWindow => {
    return Object.values(TimeWindow).map(v => v.toString()).includes(param);
};

export const isMediaType = (param: string): param is MediaType => {
    return Object.values(MediaType).map(v => v.toString()).includes(param);
};