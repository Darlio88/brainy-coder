import { Router } from 'express';

//controllers
import {
    getAllChallenges,
    getChallenge,
    createChallenge,
} from '../controllers/challenge';

//authorization middleware
import authorization from '../middleware/auth';

const route = Router();

//routes for challenges

route.get('/challenge', getAllChallenges);
route.get('/challenge/:id', getChallenge);
route.post('/create', authorization, createChallenge);

export default route;
