import Docker from 'dockerode';

//solutions db
import { Challenge } from '../config/challengesDB';

//utils
import saveStdout from './saveStdout';

export default async function executeCode(
    container: Docker.Container,
    challengeId
) {
    const solutionSubmitted = await Challenge.findById(challengeId);
    const execOptions = {
        Cmd: ['node', '-e', solutionSubmitted.solution],
        AttachStdin: true,
        AttachStdout: true,
        AttachStderr: true,
        AutoRemove: true,
        StdinOnce: false,
        Tty: true,
    };

    const exec = await container.exec(execOptions);

    exec.start({ stdin: true }, async (err, stream) => {
        if (err) {
            // Handle error
            return;
        }
        // Capture the output (stdout) of the code
        const chunks = [];
        await exec.resize({ h: 300, w: 200 }); // Set the stream size
        stream.on('data', (chunk) => {
            //chunks in a list
            chunks.push(chunk);
        });
        stream.on('end', () => {
            const buffer = Buffer.concat(chunks);
            const stdout = buffer.toString('utf8');
            saveStdout(challengeId, stdout);
        });
    });
}
