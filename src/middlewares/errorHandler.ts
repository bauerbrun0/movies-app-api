import { NextFunction, Request, Response } from 'express';

import { CustomError } from '../utils/errors';

const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({ 
            name: err.name,
            message: err.message,
        });
    }

    return res.status(500).json({
        name: "Unknown error",
        message: err.message
    });
};


export default errorHandler;