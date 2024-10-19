import { Schema } from "mongoose";
import { User } from "../../types/user";

export const UserSchema = new Schema<User>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  dob: { type: String, required: true },
  country: { type: String, required: true },
  registrationDate: { type: String, required: true },
});
