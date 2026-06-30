import {
  checkBookmarkStatusService,
  getBookmarksService,
  toggleBookmarkService,
} from "../services/bookmark.services.js";
import connectDB from "../utils/db.js";

export const toggleBookmark = async (req, res) => {
  await connectDB();
  const result = await toggleBookmarkService(req);
  return res.status(result.statusCode).json(result.body);
};

export const getBookmarks = async (req, res) => {
  await connectDB();
  const result = await getBookmarksService(req);
  return res.status(result.statusCode).json(result.body);
};

export const checkBookmarkStatus = async (req, res) => {
  await connectDB();
  const result = await checkBookmarkStatusService(req);
  return res.status(result.statusCode).json(result.body);
};
