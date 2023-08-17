import { Router } from 'express';

//controllers
import { getAllSolutions, solveController } from '../controllers/solve';
//import auth2
import Authorization from '../middleware/auth2';

const router = Router();

router.post('/solve/:id', Authorization, solveController);

router.get('/solutions', getAllSolutions);

export default router;
