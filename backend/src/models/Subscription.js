import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    class: {
        type: ObjectId,
        required: true
    },
    users: [{
        type: ObjectId
    }],
    lastPoll: {
        type: Date,
        default: Date.now
    }
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;
