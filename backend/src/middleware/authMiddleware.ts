import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IDecodedToken } from "../types";
import { User } from "../models/user";

export interface AuthRequest extends Request {
  user?: any;
}

export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "fallback_secret",
      ) as IDecodedToken;

      req.user = await User.findById(decoded.id).select("-password");
      if (!req.user) {
        res
          .status(401)
          .json({ success: false, message: "User no longer exists." });
        return;
      }
      return next();
    } catch (error) {
      res.status(401).json({
        success: false,
        message: "Not authorized, token signature verification failed.",
      });
      return;
    }
  }

  if (!token) {
    res.status(401).json({
      success: false,
      message: "Not authorized, access token missing.",
    });
    return;
  }
};

export const authorizeRoles = (...roles: string[]) => {
  return (req: any, res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        message: `Role (${req.user?.role || "Unknown"}) is not authorized to access this resource`,
      });
      return;
    }
    next();
  };
};
