import { Router } from 'express';
import { body, validationResult } from 'express-validator';

const router: Router = Router();

router.post('/create', body('date').isISO8601(), (req, res) => {
    const err = validationResult(req);
    res.send(err);
});

export default router;
