import express, { Request, Response } from 'express';

import movieService from '../services/movieService';
import { parseMediaItemsRequest } from '../utils/parsers/mediaItemsRequest';

const router = express.Router();

router.get("/trending", async (req: Request, res: Response): Promise<Response> => {
    const mediaItemsRequest = parseMediaItemsRequest(req.body, 500);
    const trendingMovies = await movieService.getTrendingMovies(mediaItemsRequest);
    return res.json(trendingMovies);
});


export default router;