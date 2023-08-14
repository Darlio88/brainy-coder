import amqplib from 'amqplib'

import {IPayload} from '../interfaces'

//solutionsDB
import {Solution} from '../config/challengesDB'

//code runner
import { runner } from './runner';

async function queueConnection(){

  const queue = 'run-code';
  const conn = await amqplib.connect('amqp://localhost');
  const ch1 = await conn.createChannel();
  await ch1.assertQueue(queue);
//   // Sender
//   const ch2 = await conn.createChannel();
//   ch2.sendToQueue(queue, Buffer.from(JSON.stringify(payload)));
   
    // Listener
    ch1.consume(queue, async (msg) => {
        if (msg !== null) {
          const {challengeId}=(JSON.parse(msg.content.toString()))
          console.log('the typeof '+typeof challengeId)
          await runner(challengeId)
          // await solutionSubmitted.save()
          ch1.ack(msg);
        } else {
          console.log('Consumer cancelled by server');
        }
      });
}

export default queueConnection;