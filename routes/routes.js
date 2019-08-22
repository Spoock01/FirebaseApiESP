import { Router } from 'express';
import { registerRoute, mainRoute, loginRoute, } from '../controllers/firebase.controller';
import { check, validationResult } from 'express-validator';
import { MAC_REGEX } from '../utils/utils';

const router = Router();

router.get("/", mainRoute);
router.post('/login', loginRoute);
router.post('/register',
    [
        check('roomName').not().isEmpty().withMessage('Room name cannot be empty!')
            .exists().withMessage('Room name is required!'),
        check('macAddress').exists().withMessage('Mac Address is required!')
            .matches(MAC_REGEX).withMessage('Invalid MAC format!')
    ], (req, res, next) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) 
            res.status(400).send(errors);
        else 
            next();
        
    },
    registerRoute);

export default router;
