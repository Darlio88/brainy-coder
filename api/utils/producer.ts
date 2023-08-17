import amqplib from 'amqplib';

import { IPayload } from '../interfaces/payload';

async function queueConnection(payload: IPayload, queue: string) {
    // const queue = 'run-code';

    const conn = await amqplib.connect('amqp://localhost');

    const ch1 = await conn.createChannel();
    await ch1.assertQueue(queue);
    // Sender
    const ch2 = await conn.createChannel();
    ch2.sendToQueue(queue, Buffer.from(JSON.stringify(payload)));

    // // Listener
    // ch1.consume(queue, (msg) => {
    //     if (msg !== null) {
    //       console.log('Recieved:', msg.content.toString());
    //       ch1.ack(msg);
    //     } else {
    //       console.log('Consumer cancelled by server');
    //     }
    //   });
}

export default queueConnection;
