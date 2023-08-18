import axios from 'axios';

import tmdbConfig from '../config/tmdb.config';
import { BaseMediaItemsResponse, MediaItemsRequest } from '../types';
import { parseBaseMediaItemsResponse } from '../utils/parsers/baseMediaItemsResponse';

// Will return Promise<MediaItemsResponse> eventually.
const getTrendingMovies = async (mediaItemsRequest: MediaItemsRequest): Promise<BaseMediaItemsResponse> => {
    const { page, language, timeWindow } = mediaItemsRequest;
    const res = await axios.get(
        `${tmdbConfig.baseURL}/trending/movie/${timeWindow}?page=${page}&language=${language}`,
        tmdbConfig.requestConfig
    );

    const baseMediaItemsResponse = parseBaseMediaItemsResponse(res.data);
    return baseMediaItemsResponse;
};

export default {
    getTrendingMovies
};