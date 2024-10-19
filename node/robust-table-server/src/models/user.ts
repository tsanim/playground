import mongoose from "mongoose";
import { UserSchema } from "./schemas/user";
import { User } from "../types/user";

const UserModel = mongoose.model<User>("User", UserSchema);

const getUserById = (id: string) => UserModel.findById(id);
const getAll = () => UserModel.find();

const insertMany = (users: User[]) => UserModel.insertMany(users);
const getTotalCount = () => UserModel.countDocuments();
const getPaginated = ({ skip, limit }: { skip: number; limit: number }) =>
  UserModel.find().skip(skip).limit(limit);

export { getUserById, insertMany, getPaginated, getTotalCount, getAll };
