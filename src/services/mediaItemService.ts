import axios from 'axios';
import localeCode from 'locale-code';

import tmdbConfig from '../config/tmdb.config';
import { BaseMediaItem, Genre, Language, MediaItem, MediaItemsResponse, MediaType } from '../types';
import { parseBaseMediaItemsResponse } from '../utils/parsers/baseMediaItemsResponse';
import { parseGenresResponse } from '../utils/parsers/genresResponse';
import { parseLogosResponse } from '../utils/parsers/logosResponse';
import { parseTaglineResponse } from '../utils/parsers/taglineResponse';

const getMediaItemsResponse = async (
url: string, language: Language, defaultMediaType: MediaType | null = null
): Promise<MediaItemsResponse> => {
    const res = await axios.get(
        url + `&language=${language}`,
        tmdbConfig.requestConfig
    );

    const baseMediaItemsResponse = parseBaseMediaItemsResponse(res.data, defaultMediaType);
    const mediaItems = await completeMediaItems(baseMediaItemsResponse.mediaItems, language);

    return {
        ...baseMediaItemsResponse,
        mediaItems
    };
};

const completeMediaItems = async (baseMediaItems: BaseMediaItem[], language: Language): Promise<MediaItem[]> => {
    const mediaItemPromises = baseMediaItems.map(baseMediaItem => completeMediaItem(baseMediaItem, language));
    return await Promise.all(mediaItemPromises);
};

const completeMediaItem = async (baseMediaItem: BaseMediaItem, language: Language): Promise<MediaItem> => {
    return {
        ...baseMediaItem,
        logoPath: await getLogoPath(baseMediaItem.id, baseMediaItem.mediaType, language),
        tagline: await getTagline(baseMediaItem.id, baseMediaItem.mediaType, language) 
    };
};

const getLogoPath = async (mediaItemId: number, mediaType: MediaType, language: Language): Promise<string | null> => {
    const res = await axios(
        `${tmdbConfig.baseURL}/${mediaType}/${mediaItemId}/images`,
        tmdbConfig.requestConfig
    );

    const logos = parseLogosResponse(res.data);
    
    if (logos.length === 0) {
        return null;
    }

    const languageCode = localeCode.getLanguageCode(language);
    const logosWithRequiredLanguage = logos.filter(logo => logo.language === languageCode);
    
    if (logosWithRequiredLanguage.length > 0) {
        return logosWithRequiredLanguage[0].logoPath;
    }

    if (language !== Language.English) {
        const englishLogos = logos.filter(logo => logo.language === localeCode.getLanguageCode(Language.English));
        if (englishLogos.length > 0) {
            return englishLogos[0].logoPath;
        }
    }

    return logos[0].logoPath;
};

const getTagline = async (mediaItemId: number, mediaType: MediaType, language: Language): Promise<string | null> => {
    const res = await axios(
        `${tmdbConfig.baseURL}/${mediaType}/${mediaItemId}?language=${language}`,
        tmdbConfig.requestConfig
    );

    const tagline = parseTaglineResponse(res.data);

    return tagline;
};

const getGenres = async (mediaType: MediaType, language: Language): Promise<Genre[]> => {
    const res = await axios(
        `${tmdbConfig.baseURL}/genre/${mediaType}/list?language=${language}`,
        tmdbConfig.requestConfig
    );
    
    const genres = parseGenresResponse(res.data);

    return genres;
};

export default {
    getMediaItemsResponse, getGenres
};