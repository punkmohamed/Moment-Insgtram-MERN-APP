import mongoose from 'mongoose';

const notificationSchema = mongoose.Schema({
    reciver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: { type: String, required: true },
    type: { type: String, enum: ['like', 'comment'], required: true },
    link: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});


const notifictionsmodel = mongoose.model("Notifications", notificationSchema);
export default notifictionsmodel