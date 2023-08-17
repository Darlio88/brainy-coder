import { Solution } from '../config/solutionDB';
export default async function (challengeId) {
    let currentSolution = await Solution.findById(challengeId);
    if (currentSolution.output === currentSolution.stdout) {
        await Solution.findByIdAndUpdate(challengeId, { correct: true });
    }
    //
}
