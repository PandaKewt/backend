import { Router } from 'express';
import { body, validationResult } from 'express-validator';
//Config file
import { auth, db } from '../config/firebase.config';
import { isAuthenticated } from '../middleware/firebase';
import { debugAccount } from '../debug';

const router: Router = Router();

const promiseHandler = async (promise: Promise<any>) => {
    try {
        return [null, await promise];
    } catch (err) {
        return [err, null];
    }
};

router.post(
    '/register',
    body('email').isEmail(),
    body('password').isStrongPassword(),
    body('firstName').isLength({ min: 2, max: 30 }).trim(),
    body('lastName').isLength({ min: 2, max: 30 }).trim(),
    // body('phoneNumber').isMobilePhone('vi-VN'),
    // body('yearOfBirth').isISO8601(),
    async (req, res) => {
        const err = validationResult(req);
        if (err.isEmpty()) {
            const { email, password, firstName, lastName } = req.body;
            // yearOfBirth, phoneNumber;
            const [err, data] = await promiseHandler(
                auth.createUser({
                    email,
                    password,
                    displayName: `${firstName} ${lastName}`,
                    disabled: false,
                })
            );
            if (data !== null) {
                // console.log(data, err);
                res.status(200).send(
                    'Account create successfully, UserID:' + data.uid
                );
                debugAccount('Account create successfully, UserID:' + data.uid);
                const docRef = db.collection('user').doc(data.uid);
                await docRef.set({
                    lastName,
                    firstName,
                });
            } else {
                switch (err.code) {
                    case 'auth/email-already-exists':
                        debugAccount(
                            'Account create failed, mail already exist'
                        );
                        res.status(400).send(err.message);
                        break;
                    default:
                        debugAccount('Account create failed, Error:', err.code);
                        res.status(400).send(err.message);
                }
            }
        } else {
            debugAccount('Account create failed, Error:');
            res.status(400).send(err.mapped());
        }
    }
);

router.get('/logintest', isAuthenticated, (_, res) => {
    res.send('Done');
});

debugAccount('API Account router loaded');

export default router;
