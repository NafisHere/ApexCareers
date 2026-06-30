import {
  applyJobService,
  getApplicantsService,
  getAppliedJobsService,
  updateStatusService,
} from "../services/application.services.js";
import connectDB from "../utils/db.js";

export const applyJob = async (req, res) => {
  await connectDB();
  const result = await applyJobService(req);
  return res.status(result.statusCode).json(result.body);
};

export const getAppliedJobs = async (req, res) => {
  await connectDB();
  const result = await getAppliedJobsService(req);
  return res.status(result.statusCode).json(result.body);
};

export const getApplicants = async (req, res) => {
  await connectDB();
  const result = await getApplicantsService(req);
  return res.status(result.statusCode).json(result.body);
};

export const updateStatus = async (req, res) => {
  await connectDB();
  const result = await updateStatusService(req);
  return res.status(result.statusCode).json(result.body);
};
