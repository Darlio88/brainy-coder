import { IChallenge } from '../interfaces/challengeInterface';

function insertId(challenges: IChallenge[]): IChallenge[] {
    return challenges.map((challenge, id) => ({ ...challenge, id: id + 1 }));
}

export default insertId;
