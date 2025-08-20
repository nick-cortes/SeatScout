import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    class: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId
    }],
    lastPoll: {
        type: Date,
        default: Date.now
    }
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;
