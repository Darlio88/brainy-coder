import { Router } from 'express';

//controllers
import {
    signInController,
    signUpController,
    getAllUsers,
} from '../controllers/auth';

const router = Router();

router.get('/all', getAllUsers);
router.post('/sign-in', signInController);
router.post('/sign-up', signUpController);

export default router;
