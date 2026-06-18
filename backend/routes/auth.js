import express from "express";
import User from "../models/User.js";

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  const { mobile, password} = req.body;

  try {
    const user = await User.create({
      mobile,
      password,
    });

    res.json({
      status: "success",
      user
    });
  } catch (err) {
    res.json({
      status: "error",
      message: err.message
    });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { mobile, password } = req.body;

  const user = await User.findOne({ mobile, password });

  if (!user) {
    return res.json({
      status: "error",
      message: "Invalid credentials"
    });
  }

  res.json({
    status: "success",
    user
  });
});

export default router;