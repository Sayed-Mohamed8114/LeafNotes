import mongoose from "moongose";

const userSchema = new mongoose.Schema({
  fullname: { type: String, required: true, trim: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  createdOn: { type: Date, default: new Date().getTime() },
});
const User = mongoose.model("User", userSchema);

export default User;
