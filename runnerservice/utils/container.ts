import Docker from 'dockerode';
const docker = new Docker();

async function createContainer(language: string): Promise<Docker.Container> {
    //const image = `node:${language}-slim`; // Change this based on the language you want to support
    const image = 'node:lts-bullseye-slim'; // Change this based on the language you want to support
    const createOptions = {
        Image: image,
        Tty: true,
        AttachStdin: true,
        AttachStdout: true,
        AttachStderr: true,
        OpenStdin: true,
        Cmd: ["sh"],
        autoRemove: true,
        HostConfig: {
            AutoRemove: true,
        },
    };

    const container = await docker.createContainer(createOptions);
    return container;
}

export default createContainer;
