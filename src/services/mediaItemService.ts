import axios from 'axios';
import localeCode from 'locale-code';

import tmdbConfig from '../config/tmdb.config';
import { BaseMediaItem, Language, MediaItem, MediaType } from '../types';
import { parseLogosResponse } from '../utils/parsers/logosResponse';
import { parseTaglineResponse } from '../utils/parsers/taglineResponse';

export const completeMediaItems = async (baseMediaItems: BaseMediaItem[], language: Language): Promise<MediaItem[]> => {
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

export default {
    completeMediaItems
};