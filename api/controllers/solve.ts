import { Response, Request } from 'express';

import { Challenge } from '../config/challengeDbConfig';
import { Solution } from '../config/solutionDBConfig';

import sendToQueue from '../utils/producer';

export const solveController = async (req: Request, res: Response) => {
    try {
        console.log('these are your params' + req.params);
        const param = req.params;
        const id = param.id;
        const code = req.body.code;
        const email = req.body.email;
        /*get the expected output from challengeDb, save it together with user email in the solutionsDb
          
        */

        //retrive the challenge
        const challenge = await Challenge.findById(id);
        if (!challenge) return res.status(404).send('Challenge not found');
        console.log(challenge + 'is here');
        const expectedOutput = challenge.answer;
        const solution = await Solution.create({
            output: expectedOutput,
            solution: code,
            email,
        });
        await solution.save();
        //send id to user
        res.status(200).send({ url: solution._id });
        //send id to queue for processing
        await sendToQueue({ challengeId: solution._id }, 'run-code');
    } catch (error) {
        return res.status(500).send('Server Error');
    }
};

export const getAllSolutions = async (req: Request, res: Response) => {
    const allSolutions = await Solution.find({});
    allSolutions.map((soln) => {
        console.log(soln.stdout);
    });
    console.log(allSolutions);
    res.send(allSolutions);
};
