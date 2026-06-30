import {
  loginService,
  logoutService,
  registerService,
  updateProfileService,
} from "../services/user.services.js";
import connectDB from "../utils/db.js";

export const register = async (req, res) => {
  await connectDB();
  const result = await registerService(req);
  return res.status(result.statusCode).json(result.body);
};

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
    // clear both cookies if you use them
    .clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    })
    .clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    })
    .json(result.body);
};

export const updateProfile = async (req, res) => {
  await connectDB();
  const result = await updateProfileService(req);
  return res.status(result.statusCode).json(result.body);
};
