import tmdbConfig from '../config/tmdb.config';
import { Genre, Language, MediaItemsRequest, MediaItemsResponse, MediaType } from '../types';
import { NotFoundError } from '../utils/errors';
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

const getGenres = async (language: Language): Promise<Genre[]> => {
    return await mediaItemService.getGenres(MediaType.Movie, language);
};

const getMoviesByGenreId = async (genreId: number, mediaItemsRequest: MediaItemsRequest): Promise<MediaItemsResponse> => {
    const { page, language } = mediaItemsRequest;
    const url = `${tmdbConfig.baseURL}/discover/movie?include_adult=false&include_video=false&sort_by=popularity.desc&page=${page}&with_genres=${genreId}`;

    const movies = await mediaItemService.getMediaItemsResponse(url, language, MediaType.Movie);

    if (movies.mediaItems.length === 0) {
        const genres = await getGenres(language);
        if (!genres.map(genre => genre.id).includes(genreId)) {
            throw new NotFoundError("Cannot find genre with given genreId");
        }
    }

    return movies;
};

export default {
    getTrendingMovies, getPopularMovies, getTopRatedMovies, getNowPlayingMovies, getUpcomingMovies, getGenres, getMoviesByGenreId
};