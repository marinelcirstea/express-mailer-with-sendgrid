import { model, Schema } from "mongoose";

interface WebsiteInterface {
  _id?: string;
  address: string;
  isVerified: boolean;
}

export interface UserInterface {
  _id?: string;
  email: string;
  websites: WebsiteInterface[];
}

const userSchema = new Schema<UserInterface>({
  email: { type: String, required: [true, "Please provide a valid email."], unique: true },
  websites: [
    {
      address: { type: String, required: true },
      isVerified: { type: Boolean, default: false },
    },
  ],
});

const User = model<UserInterface>("User", userSchema);

export default User;
