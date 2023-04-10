import { Request, Response, NextFunction } from 'express';
import { auth } from 'firebase-admin';
import { debugFirebase } from '../debug';

export const isAuthenticated = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { authorization } = req.headers;

    if (!authorization)
        return res.status(401).send({ message: 'Unauthorized' });

    if (!authorization.startsWith('Bearer'))
        return res.status(401).send({ message: 'Unauthorized' });

    const split = authorization.split('Bearer ');
    if (split.length !== 2)
        return res.status(401).send({ message: 'Unauthorized' });
    const token = split[1];
    try {
        const decodedToken: auth.DecodedIdToken = await auth().verifyIdToken(
            token
        );
        debugFirebase('decodedToken', JSON.stringify(decodedToken));
        res.locals = {
            ...res.locals,
            uid: decodedToken.uid,
            role: decodedToken.role,
            email: decodedToken.email,
        };
        return next();
    } catch (err) {
        debugFirebase('Unauthorized user try to login');
        return res.status(401).send({ message: 'Unauthorized' });
    }
};
