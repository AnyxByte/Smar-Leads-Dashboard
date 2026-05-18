import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user";
import axios from "axios";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const generateToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "fallback_secret", {
    expiresIn: "7d",
  });
};

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({
        success: false,
        message: "Please provide all registration fields.",
      });
      return;
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({
        success: false,
        message: "User account email already exists.",
      });
      return;
    }

    const user = await User.create({ name, email, password, role });

    res.status(201).json({
      success: true,
      token: generateToken(user._id.toString()),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "Please enter your email and password.",
      });
      return;
    }

    const user = await User.findOne({ email });
    if (user && (await user.comparePassword(password))) {
      res.status(200).json({
        success: true,
        token: generateToken(user._id.toString()),
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
      return;
    }

    res.status(401).json({
      success: false,
      message: "Invalid email profile or password combination.",
    });
  } catch (error) {
    next(error);
  }
};

export const githubAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { code } = req.body;

    if (!code) {
      res.status(400).json({
        success: false,
        message: "GitHub authorization code is missing.",
      });
      return;
    }

    const tokenResponse = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      {
        headers: { Accept: "application/json" },
      },
    );

    const accessToken = tokenResponse.data.access_token;
    if (!accessToken) {
      res.status(400).json({
        success: false,
        message: "Invalid or expired GitHub authorization code.",
      });
      return;
    }

    const userProfileResponse = await axios.get("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const { name, login, email: githubEmail } = userProfileResponse.data;
    let email = githubEmail;

    if (!email) {
      try {
        const emailResponse = await axios.get(
          "https://api.github.com/user/emails",
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          },
        );

        const primaryEmailObj = emailResponse.data.find(
          (e: any) => e.primary === true,
        );
        if (primaryEmailObj) {
          email = primaryEmailObj.email;
        }
      } catch (emailError) {
        console.error("Failed to fetch private GitHub emails:", emailError);
      }
    }

    if (!email) {
      email = `${login}@github.user.node`;
    }

    const normalizedEmail = email.toLowerCase();

    let user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      const randomPassword = Math.random().toString(36).slice(-16) + "G1!";

      user = await User.create({
        name: name || login,
        email: normalizedEmail,
        password: randomPassword,
        role: "Sales User",
      });
      console.log(
        ` Successfully created a new user document for: ${normalizedEmail}`,
      );
    } else {
      console.log(
        ` Active user found returning via GitHub: ${normalizedEmail}`,
      );
    }

    res.status(200).json({
      success: true,
      token: generateToken(user._id.toString()),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const googleAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { token } = req.body;

    if (!token) {
      res
        .status(400)
        .json({ success: false, message: "Google access token is missing." });
      return;
    }

    const tokenValidationResponse = await axios.get(
      `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${token}`,
    );

    const tokenInfo = tokenValidationResponse.data;

    const backendClientId = process.env.GOOGLE_CLIENT_ID;
    if (tokenInfo.azp !== backendClientId) {
      console.error("🚨 Security Failure: Token Client ID mismatch!");
      res.status(401).json({
        success: false,
        message: "Token client ID mismatch security failure.",
      });
      return;
    }

    const email = tokenInfo.email;
    if (!email) {
      res.status(400).json({
        success: false,
        message: "Unable to retrieve email from Google payload.",
      });
      return;
    }

    let user = await User.findOne({ email });

    if (!user) {
      const randomPassword = Math.random().toString(36).slice(-16) + "G1!";
      const fallbackName = email.split("@")[0];

      user = await User.create({
        name: fallbackName,
        email,
        password: randomPassword,
        role: "Sales User",
      });
    }

    const userIdStr = user._id.toString();

    res.status(200).json({
      success: true,
      token: generateToken(userIdStr), 
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error: any) {
    console.error("─── GOOGLE VERIFICATION AXIOS ERROR ");
    console.error("Message:", error.response?.data || error.message);
    console.error("Status Code from Google Api:", error.response?.status);

    res.status(401).json({
      success: false,
      message: "Invalid Google account token verification failed.",
      error: error.response?.data?.error_description || error.message,
    });
  }
};

export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User account not found in system index.",
      });
    }

    const { name, email } = req.body;

    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email: email.toLowerCase() });
      if (emailExists) {
        return res.status(400).json({
          success: false,
          message:
            "This email address is already registered to another account.",
        });
      }
      user.email = email.toLowerCase();
    }

    if (name) user.name = name.trim();

    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      data: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
      },
    });
  } catch (error) {
    console.error("Profile update error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error during profile modifications execution.",
    });
  }
};
