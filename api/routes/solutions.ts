import { Router } from 'express';

//controller
import { getSolution } from '../controllers/solution';

const router = Router();

//route for getting the solutions

router.get('/solution/:id', getSolution);

export default router;
