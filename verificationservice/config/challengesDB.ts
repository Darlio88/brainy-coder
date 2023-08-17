import mongoose from 'mongoose';

//models
const schema = new mongoose.Schema({
    title: String,
    description: String,
    output: String,
    creator: String,
    functionDefinition: String,
    verified: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    answer: String,
    solution: String,
});

export const Challenge = mongoose.model('challenges', schema);
//connection

export default async function challengesDBConnection() {
    await mongoose
        .connect('mongodb://myuser:mypassword@localhost:27017', {})
        .then(() => {
            console.log('Connected to the challenges database');
        });
}
