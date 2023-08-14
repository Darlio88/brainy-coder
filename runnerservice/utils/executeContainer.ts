import Docker from 'dockerode';

//solutions db
import { Solution } from '../config/challengesDB';

//utils
import saveStdout from './saveStdout';

export default async function executeCode(
    container: Docker.Container,
    challengeId,
){
    const solutionSubmitted = await Solution.findById(challengeId)
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

    exec.start({ stdin: true },  async (err, stream) => {
        if (err) {
            // Handle error
            return;
        }
        // Capture the output (stdout) of the code
        const chunks = [];
        await exec.resize({ h: 300, w: 200 }); // Set the stream size
        stream.on('data', (chunk) => chunks.push(chunk));
        stream.on('end',  () => {
            const stdout = Buffer.concat(chunks).toString();
             console.log(stdout)
             saveStdout(challengeId,stdout)
        });
    });
    
}
