import express, { Request, Response } from 'express';

import movieService from '../services/movieService';
import routeBuilder from '../utils/builders/routeBuilder';
import { parseGenresRequest } from '../utils/parsers/genresRequest';

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

export default router;