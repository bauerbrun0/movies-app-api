import { Request, Response, Router } from 'express';

import tmdbConfig from '../../config/tmdb.config';
import { MediaItemsRequest, MediaItemsResponse } from '../../types';
import { parseMediaItemsRequest } from '../parsers/mediaItemsRequest';

const addMediaItemsRoute = (
    router: Router,
    route: string,
    serviceFunction: ((mediaItemsRequest: MediaItemsRequest) => Promise<MediaItemsResponse>),
    maxPage: number = tmdbConfig.maxPages
) => {
    router.get(route, async (req: Request, res: Response): Promise<Response> => {
        const mediaItemsRequest = parseMediaItemsRequest(req.body, maxPage);
        const mediaItemsResponse = await serviceFunction(mediaItemsRequest);

        return res.json(mediaItemsResponse);
    });
};

export default {
    addMediaItemsRoute
};