import {
  clearAllNotificationsService,
  createNotificationService,
  getAdminNotificationsService,
  getUnreadNotificationCountService,
  getUserNotificationsService,
  markNotificationAsReadService,
} from "../services/notification.services.js";
import connectDB from "../utils/db.js";

export const createNotification = async (req, res) => {
  await connectDB();
  const result = await createNotificationService(req.body);
  return res.status(result.statusCode).json(result.body);
};

export const getAdminNotifications = async (req, res) => {
  await connectDB();
  const result = await getAdminNotificationsService(req);
  return res.status(result.statusCode).json(result.body);
};

export const getUserNotifications = async (req, res) => {
  await connectDB();
  const result = await getUserNotificationsService(req);
  return res.status(result.statusCode).json(result.body);
};

export const markNotificationAsRead = async (req, res) => {
  await connectDB();
  const result = await markNotificationAsReadService(req);
  return res.status(result.statusCode).json(result.body);
};

export const getUnreadNotificationCount = async (req, res) => {
  await connectDB();
  const result = await getUnreadNotificationCountService(req);
  return res.status(result.statusCode).json(result.body);
};

export const clearAllNotifications = async (req, res) => {
  await connectDB();
  const result = await clearAllNotificationsService(req);
  return res.status(result.statusCode).json(result.body);
};
