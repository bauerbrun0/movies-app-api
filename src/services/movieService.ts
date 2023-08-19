import tmdbConfig from '../config/tmdb.config';
import { MediaItemsRequest, MediaItemsResponse } from '../types';
import mediaItemService from './mediaItemService';

const getTrendingMovies = async (mediaItemsRequest: MediaItemsRequest): Promise<MediaItemsResponse> => {
    const { page, language, timeWindow } = mediaItemsRequest;
    const url = `${tmdbConfig.baseURL}/trending/movie/${timeWindow}?page=${page}`;

    return await mediaItemService.getMediaItemsResponse(url, language);
};

const getPopularMovies = async (mediaItemsRequest: MediaItemsRequest): Promise<MediaItemsResponse> => {
    const { page, language } = mediaItemsRequest;
    const url = `${tmdbConfig.baseURL}/movie/popular?page=${page}`;

    return await mediaItemService.getMediaItemsResponse(url, language);
};

const getTopRatedMovies = async (mediaItemsRequest: MediaItemsRequest): Promise<MediaItemsResponse> => {
    const { page, language } = mediaItemsRequest;
    const url = `${tmdbConfig.baseURL}/movie/top_rated?page=${page}`;

    return await mediaItemService.getMediaItemsResponse(url, language);
};

const getNowPlayingMovies = async (mediaItemsRequest: MediaItemsRequest): Promise<MediaItemsResponse> => {
    const { page, language } = mediaItemsRequest;
    const url = `${tmdbConfig.baseURL}/movie/now_playing?page=${page}`;

    return await mediaItemService.getMediaItemsResponse(url, language);
};

const getUpcomingMovies = async (mediaItemsRequest: MediaItemsRequest): Promise<MediaItemsResponse> => {
    const { page, language } = mediaItemsRequest;
    const url = `${tmdbConfig.baseURL}/movie/upcoming?page=${page}`;

    return await mediaItemService.getMediaItemsResponse(url, language);  
};

export default {
    getTrendingMovies, getPopularMovies, getTopRatedMovies, getNowPlayingMovies, getUpcomingMovies
};