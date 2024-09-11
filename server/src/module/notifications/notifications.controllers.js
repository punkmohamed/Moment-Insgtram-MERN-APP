
import notifictionsmodel from '../../../db/models/notifications.js';
import PostMessage from '../../../db/models/postMessage.js';
import mongoose from "mongoose";
import UserModal from "../../../db/models/user.js";


export const getUserNotifications = async (req, res) => {
    try {
        const userId = req.userId;

        const notifications = await notifictionsmodel.find({ reciver: userId });

        if (!notifications) {
            return res.status(404).json({ message: "No notifications found" });
        }

        res.status(200).json({ data: notifications });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};



export const updateUserNotifications = async (req, res) => {
    const userId = req.userId;

    const { isRead } = req.body;

    const results = await notifictionsmodel.updateMany({ reciver: userId }, { $set: { isRead } }, { new: true })
    console.log(results, "results");

    // req.io.emit('updatedPost', results);
    res.json(results);
}

export const deleteUserNotifications = async (req, res) => {
    const { id } = req.params;

    await notifictionsmodel.findByIdAndDelete(id);

    res.json({ message: "Notifications deleted successfully." });
}


