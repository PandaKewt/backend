import { Express, Response, NextFunction } from 'express';

export const disableXPoweredBy = (app: Express) => {
    app.disable('x-powered-by');
};

export const corsAllowAll = (_: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Max-Age', '1800');
    res.setHeader('Access-Control-Allow-Headers', 'content-type');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'PUT, POST, GET, DELETE, PATCH, OPTIONS'
    );
};
