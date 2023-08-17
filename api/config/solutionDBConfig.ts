import mongoose from 'mongoose';

//models

const schema = new mongoose.Schema({
    solution: String,
    email: String,
    output: String,
    stdout: String,
    correct: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

export const Solution = mongoose.model('solution', schema);
