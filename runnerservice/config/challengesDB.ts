import mongoose from 'mongoose';

//models
const schema = new mongoose.Schema({
    solution:String,
    email:String,
    output: String,
    stdout:String,
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

export const Solution = mongoose.model('solution', schema);

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