import { Document, Types } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId; 
  name: string;
  email: string;
  password?: string;
  role: "Admin" | "Sales User";
  createdAt: Date;
  updatedAt: Date;
  comparePassword: (password: string) => Promise<boolean>;
}

export interface IDecodedToken {
  id: string;
  iat: number;
  exp: number;
}