import express from 'express';

import movieService from '../services/movieService';
import routeBuilder from '../utils/builders/routeBuilder';

const router = express.Router();

routeBuilder.addMediaItemsRoute(router, "/trending", movieService.getTrendingMovies);
routeBuilder.addMediaItemsRoute(router, "/popular", movieService.getPopularMovies);
routeBuilder.addMediaItemsRoute(router, "/top-rated", movieService.getTopRatedMovies);
routeBuilder.addMediaItemsRoute(router, "/now-playing", movieService.getNowPlayingMovies);
routeBuilder.addMediaItemsRoute(router, "/upcoming", movieService.getUpcomingMovies);

export default router;