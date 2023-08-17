import { Response, Request } from 'express';

//challenge model
import { Challenge } from '../config/challengeDbConfig';
import { IChallenge } from '../interfaces/challenge';

//queue
import sendToQueue from '../utils/producer';

export const getAllChallenges = async (req: Request, res: Response) => {
    try {
        const allChallenges = await Challenge.find(
            {},
            'creator title functionDefinition creator description output verified'
        );
        console.log(allChallenges);
        res.status(200).send(allChallenges);
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Server Error' });
    }
};

export const getChallenge = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        console.log(id);
        const challenge = await Challenge.findById(id);
        console.log(challenge);
        res.status(200).send(challenge);
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Server Error' });
    }
};

export const createChallenge = async (req: Request, res: Response) => {
    try {
        const challenge: IChallenge = req.body;
        console.log(challenge);
        const createdChallenge = await Challenge.create({ ...challenge });
        await createdChallenge.save();
        const challengeId = createdChallenge._id;
        //send it to the queue for verification
        await sendToQueue({ challengeId }, 'run-challenge');
        res.status(201).send(createdChallenge);
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Server Error' });
    }
};
