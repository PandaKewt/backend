import { Router } from 'express';
import debug from 'debug';
//Import router
import symtom from './symtom';
import account from './account';
import schedue from './schedue';

const router: Router = Router();
const apiDebug = debug('backend:api');

router.get('/', (_, res) => {
    res.status(200).send('This is healthcare backend.');
});
router.use('/symtomCheck', symtom);
router.use('/account', account);
router.use('/schedue', schedue);

apiDebug('API router loaded');

export default router;
