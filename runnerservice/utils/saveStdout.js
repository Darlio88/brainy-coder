import { Solution } from '../config/solutionDB';

//correctness update
import isCorrect from './isCorrect';

export default async function (challengeId, stdout) {
    await Solution.findByIdAndUpdate(challengeId, { stdout: stdout }).then(
        () => {
            isCorrect(challengeId);
        }
    );
}
