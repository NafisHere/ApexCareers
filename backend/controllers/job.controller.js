import {
  deleteJobService,
  getAdminJobsService,
  getAllJobsService,
  getJobByIdService,
  postJobService,
  updateJobService,
} from "../services/job.services.js";
import connectDB from "../utils/db.js";

export const postJob = async (req, res) => {
  await connectDB();
  const result = await postJobService(req);
  return res.status(result.statusCode).json(result.body);
};

export const getAllJobs = async (req, res) => {
  await connectDB();
  const result = await getAllJobsService(req);
  return res.status(result.statusCode).json(result.body);
};

export const getJobById = async (req, res) => {
  await connectDB();
  const result = await getJobByIdService(req);
  return res.status(result.statusCode).json(result.body);
};

export const getAdminJobs = async (req, res) => {
  await connectDB();
  const result = await getAdminJobsService(req);
  return res.status(result.statusCode).json(result.body);
};

export const updateJob = async (req, res) => {
  await connectDB();
  const result = await updateJobService(req);
  return res.status(result.statusCode).json(result.body);
};

export const deleteJob = async (req, res) => {
  await connectDB();
  const result = await deleteJobService(req);
  return res.status(result.statusCode).json(result.body);
};
