import Docker from 'dockerode';
import createContainer from './container';

//container execution code
import startContainer from './startContainer';
import stopContainer from './stopContainer';
import executeCode from './executeContainer';

export async function runner(challengeId:string) {
    let output=''
    try {
        const container = await createContainer('node');
        await startContainer(container);
        await executeCode(container, challengeId);
         
        // Ensure the container is stopped before removing it
        await stopContainer(container);
    } catch (err) {
        console.error('Error:', err);
    }
}

