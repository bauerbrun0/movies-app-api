import axios from 'axios';

import { TMDB_API_BASE_URL, TMDB_BASE_CONFIG } from '../constants';
import { BaseMediaItemsResponse, MediaItemsRequest } from '../types';
import { parseBaseMediaItemsResponse } from '../utils/parsers/baseMediaItemsResponse';

// Will return Promise<MediaItemsResponse> eventually.
const getTrendingMovies = async (mediaItemsRequest: MediaItemsRequest): Promise<BaseMediaItemsResponse> => {
    const { page, language, timeWindow } = mediaItemsRequest;
    const res = await axios.get(
        `${TMDB_API_BASE_URL}/trending/movie/${timeWindow}?page=${page}&language=${language}`,
        TMDB_BASE_CONFIG
    );

    const baseMediaItemsResponse = parseBaseMediaItemsResponse(res.data);
    return baseMediaItemsResponse;
};

export default {
    getTrendingMovies
};