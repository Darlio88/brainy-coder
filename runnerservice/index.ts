import solutionDbConnection from './config/challengesDB'
import messageQueueConnection from './utils/consumer'

//connect to the database
solutionDbConnection().catch(err=>console.log("Solution DB connection Error:"+err))
messageQueueConnection().catch(err=>console.log("Queue connection Error:"+err))
//connect to the queue and consume payloads

//consumer should also update the database

//remain listening to the queue;