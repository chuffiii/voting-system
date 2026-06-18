import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  mobile: String,
  password: String,
  hasVoted: {
    type: Boolean,
    default: false
  }
});

export default mongoose.model("User", userSchema);