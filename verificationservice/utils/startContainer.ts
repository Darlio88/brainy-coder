import Docker from 'dockerode';
export default async function startContainer(container: Docker.Container) {
    await container.start();
    return container;
}
