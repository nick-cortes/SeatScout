import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
    term: {
        type: Number,
        required: true,
    },
    crn: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    section: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    prof: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
});

// add autoIndex setting for performance?
classSchema.index({ term: 1, crn: 1 }, { unique: true });

const Class = mongoose.model('Class', classSchema);

export default Class;