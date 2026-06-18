import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
  name: String,
  votes: {
    type: Number,
    default: 0
  }
});

const Group = mongoose.model("Group", groupSchema);

export default Group;