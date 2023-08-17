import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

//database configurations
import userDatabaseConnection from './config/userDbConfig';
import challengesDBConnection from './config/challengeDbConfig';
//routes
import userRoutes from './routes/auth';
import challengeRoutes from './routes/challenges';
import solutionRoutes from './routes/solve';
import solvedSolution from './routes/solutions';

//connecting to databases
userDatabaseConnection();
challengesDBConnection().catch((err) => console.log(err));

const app: express.Application = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '50mb' }));

app.use('/api', userRoutes);
app.use('/api', challengeRoutes);
app.use('/api', solutionRoutes);
app.use('/api', solvedSolution);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('app running on port', PORT);
});
