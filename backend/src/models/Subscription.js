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
        type: Number,
        default: Date.now()
    },
    interval: {
        type: Number,
        default: 1000
    }

});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;
