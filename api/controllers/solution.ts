import { Response, Request } from 'express';

import { Solution } from '../config/solutionDBConfig';

export const getSolution = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        console.log(id);
        const solution = await Solution.findById(id);
        if (!solution) return res.status(404).send('Solution unavailable');
        res.status(200).send(solution);
    } catch (error) {
        console.log(error);
        res.status(501).send('Server Error');
    }
};
