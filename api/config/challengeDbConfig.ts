import mongoose from 'mongoose';

//models
const schema = new mongoose.Schema({
    title: String,
    description: String,
    output: String,
    creator: String,
    functionDefinition: String,
    accepts: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

export const Challenge = mongoose.model('challenges', schema);
//connection

export default async function challengesDBConnection() {
    await mongoose
        .connect(
            'mongodb+srv://Omoding:hM1YjWC0QAvstB1e@cluster0.d7tyc.mongodb.net/?retryWrites=true&w=majority',
            {}
        )
        .then(() => {
            console.log('Connected to the challenges database');
        });
}
