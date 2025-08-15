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
    }
});

const Class = mongoose.model('Class', classSchema);

export default Class;