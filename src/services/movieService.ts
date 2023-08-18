import axios from 'axios';

import tmdbConfig from '../config/tmdb.config';
import { MediaItemsRequest, MediaItemsResponse } from '../types';
import { parseBaseMediaItemsResponse } from '../utils/parsers/baseMediaItemsResponse';
import { completeMediaItems } from './mediaItemService';

const getTrendingMovies = async (mediaItemsRequest: MediaItemsRequest): Promise<MediaItemsResponse> => {
    const { page, language, timeWindow } = mediaItemsRequest;
    const res = await axios.get(
        `${tmdbConfig.baseURL}/trending/movie/${timeWindow}?page=${page}&language=${language}`,
        tmdbConfig.requestConfig
    );

    const baseMediaItemsResponse = parseBaseMediaItemsResponse(res.data);
    const mediaItems = await completeMediaItems(baseMediaItemsResponse.mediaItems, language);

    return {
        ...baseMediaItemsResponse,
        mediaItems
    };
};

export default {
    getTrendingMovies
};