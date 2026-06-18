import express from "express";
import Group from "../models/Group.js";
import User from "../models/User.js";

const router = express.Router();


//get all groups
router.get("/", async (req, res) => {
  const groups = await Group.find();
  res.json({ groups });
});

//vote API
router.post("/vote", async (req, res) => {
  const { userId, groupId } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.json({ status: "error", message: "User not found" });
    }

    // prevent multiple voting
    if (user.hasVoted) {
      return res.json({ status: "error", message: "You already voted" });
    }

    // increase vote count
    await Group.findByIdAndUpdate(groupId, {
      $inc: { votes: 1 }
    });

    // mark user as voted
    user.hasVoted = true;
    await user.save();

    res.json({
      status: "success",
      message: "Vote recorded successfully"
    });

  } catch (err) {
    res.json({ status: "error", message: err.message });
  }
});

export default router;