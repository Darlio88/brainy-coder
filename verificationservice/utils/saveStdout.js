import { Challenge } from '../config/challengesDB';
export default async function (challengeId, stdout) {
    await Challenge.findByIdAndUpdate(challengeId, {
        answer: stdout,
        verified: true,
    });
}
