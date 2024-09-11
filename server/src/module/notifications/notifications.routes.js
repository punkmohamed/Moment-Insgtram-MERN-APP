import express from 'express';


const notificationsRoutes = express.Router();
import auth from "../../../middleware/auth.js";
import { getUserNotifications, deleteUserNotifications, updateUserNotifications } from './notifications.controllers.js';


notificationsRoutes.get('/', auth, getUserNotifications);
notificationsRoutes.delete('/:id', auth, deleteUserNotifications);
notificationsRoutes.patch('/', auth, updateUserNotifications);


export default notificationsRoutes;