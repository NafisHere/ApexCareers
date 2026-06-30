import { deleteJobService, deleteUserService, getAllJobsService, getAllUsersService, loginService, logoutService, updateUserService } from "../services/admin.services.js";
import connectDB from "../utils/db.js";

export const login = async (req, res) => {
  await connectDB();
  const result = await loginService(req);
  if (result.setCookie) {
    return res
      .status(result.statusCode)
      .cookie("token", result.setCookie.token, result.setCookie.options)
      .json(result.body);
  }
  return res.status(result.statusCode).json(result.body);
};

export const logout = async (req, res) => {
  await connectDB();
  const result = await logoutService();
  return res
    .status(result.statusCode)
    .cookie("token", "", { maxAge: 0 })
    .json(result.body);
};

export const getAllUsers = async (req, res) => {
  await connectDB();
  const result = await getAllUsersService();
  return res.status(result.statusCode).json(result.body);
};

export const updateUser = async (req, res) => {
  await connectDB();
  const result = await updateUserService(req);
  return res.status(result.statusCode).json(result.body);
};

export const deleteUser = async (req, res) => {
  await connectDB();
  const result = await deleteUserService(req);
  return res.status(result.statusCode).json(result.body);
};

export const getAllJobs = async (req, res) => {
  await connectDB();
  const result = await getAllJobsService();
  return res.status(result.status === "success" ? 200 : 500).json(result);
};

export const deleteJob = async (req, res) => {
  await connectDB();
  const result = await deleteJobService(req);
  return res.status(result.statusCode).json(result.body);
};
