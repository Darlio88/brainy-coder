import Docker from 'dockerode';

export default async function stopContainer(container: Docker.Container) {
    try {
        await container.stop();
    } catch (err) {
        console.error('Error stopping container:', err);
    }
}
