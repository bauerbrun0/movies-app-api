import express, { Request, Response } from 'express';

import tmdbConfig from '../config/tmdb.config';
import movieService from '../services/movieService';
import { ErrorStatus } from '../types';
import routeBuilder from '../utils/builders/routeBuilder';
import { parseIntegerRequestParam } from '../utils/parsers/common';
import { parseGenresRequest } from '../utils/parsers/genresRequest';
import { parseMediaItemsRequest } from '../utils/parsers/mediaItemsRequest';

const router = express.Router();

routeBuilder.addMediaItemsRoute(router, "/trending", movieService.getTrendingMovies);
routeBuilder.addMediaItemsRoute(router, "/popular", movieService.getPopularMovies);
routeBuilder.addMediaItemsRoute(router, "/top-rated", movieService.getTopRatedMovies);
routeBuilder.addMediaItemsRoute(router, "/now-playing", movieService.getNowPlayingMovies);
routeBuilder.addMediaItemsRoute(router, "/upcoming", movieService.getUpcomingMovies);

router.get("/genres", async (req: Request, res: Response): Promise<Response> => {
    const language = parseGenresRequest(req.body);
    const genres = await movieService.getGenres(language);

    return res.json(genres);
});

router.get("/genres/:id", async (req: Request, res: Response): Promise<Response> => {
    const mediaItemsRequest = parseMediaItemsRequest(req.body, tmdbConfig.maxPages);
    const genreId = parseIntegerRequestParam("id", req.params.id, ErrorStatus.BadRequest);
    const movies = await movieService.getMoviesByGenreId(genreId, mediaItemsRequest);
    
    return res.json(movies);
});

export default router;