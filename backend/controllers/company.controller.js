import {
  deleteCompanyService,
  getAllCompaniesService,
  getCompanyByIdService,
  getCompanyService,
  getCompanyVerificationStatusService,
  getPendingCompaniesService,
  registerCompanyService,
  updateCompanyService,
  verifyCompanyService,
} from "../services/company.services.js";
import connectDB from "../utils/db.js";

export const registerCompany = async (req, res) => {
  await connectDB();
  const result = await registerCompanyService(req);
  return res.status(result.statusCode).json(result.body);
};

export const getCompany = async (req, res) => {
  await connectDB();
  const result = await getCompanyService(req);
  return res.status(result.statusCode).json(result.body);
};

export const getCompanyById = async (req, res) => {
  await connectDB();
  const result = await getCompanyByIdService(req);
  return res.status(result.statusCode).json(result.body);
};

export const updateCompany = async (req, res) => {
  await connectDB();
  const result = await updateCompanyService(req);
  return res.status(result.statusCode).json(result.body);
};

export const getAllCompanies = async (req, res) => {
  await connectDB();
  const result = await getAllCompaniesService(req);
  return res.status(result.statusCode).json(result.body);
};

export const verifyCompany = async (req, res) => {
  await connectDB();
  const result = await verifyCompanyService(req);
  return res.status(result.statusCode).json(result.body);
};

export const getPendingCompanies = async (req, res) => {
  await connectDB();
  const result = await getPendingCompaniesService(req);
  return res.status(result.statusCode).json(result.body);
};

export const getCompanyVerificationStatus = async (req, res) => {
  await connectDB();
  const result = await getCompanyVerificationStatusService(req);
  return res.status(result.statusCode).json(result.body);
};

export const deleteCompany = async (req, res) => {
  await connectDB();
  const result = await deleteCompanyService(req);
  return res.status(result.statusCode).json(result.body);
};
